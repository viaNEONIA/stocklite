/* Android product-name OCR: images stay in this browser. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let generation = 0, worker = null, image = null, scriptPromise = null, timer = null, busy = false;
  const status = text => { $('ocrStatus').textContent = text; };
  function reset() {
    generation++;
    busy = false;
    clearTimeout(timer);
    if (worker) worker.terminate().catch(() => {});
    worker = null;
    if (image) image.close();
    image = null;
    $('ocrPanel').classList.add('hidden');
    $('ocrCandidates').replaceChildren();
    $('ocrPhoto').value = ''; $('ocrFile').value = '';
    $('ocrRun').disabled = true;
    $('ocrCanvas').width = $('ocrCanvas').height = 1;
  }
  function loadEngine() {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    if (!scriptPromise) scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
      script.onload = () => resolve(window.Tesseract);
      script.onerror = () => { script.remove(); scriptPromise = null; reject(Error('load')); };
      document.head.append(script);
    });
    return scriptPromise;
  }
  function draw() {
    if (!image) return;
    const canvas = $('ocrCanvas'), ctx = canvas.getContext('2d');
    const scale = Math.min(1, 1600 / Math.max(image.width, image.height));
    canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const top = Number($('ocrTop').value) / 100, bottom = Number($('ocrBottom').value) / 100;
    ctx.fillStyle = 'rgba(0,0,0,.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height * top);
    ctx.fillRect(0, canvas.height * bottom, canvas.width, canvas.height * (1-bottom));
    $('ocrRun').disabled = busy || bottom <= top;
  }
  async function select(event) {
    const file = event.target.files[0]; reset();
    if (!file) return;
    $('ocrPanel').classList.remove('hidden');
    if (!file.type.startsWith('image/') || file.size > 20 * 1024 * 1024) { status('20MB以下の画像を選んでください。'); return; }
    const token = generation;
    status('画像を準備しています…');
    try {
      const bitmap = await createImageBitmap(file, {imageOrientation:'from-image', resizeWidth:1600, resizeQuality:'high'});
      if (token !== generation) { bitmap.close(); return; }
      image = bitmap; $('ocrTop').value = 0; $('ocrBottom').value = 100;
      draw(); status('上端・下端を動かして商品名の範囲を明るく残し、「文字を読み取る」を押してください。');
    } catch { if (token === generation) status('画像を開けませんでした。JPEGまたはPNGで再度選んでください。'); }
  }
  async function run() {
    if (!image || $('ocrRun').disabled) return;
    const token = ++generation;
    busy = true;
    $('ocrRun').disabled = true; $('ocrCandidates').replaceChildren();
    status('日本語の認識データを準備しています（初回は通信が必要です）…');
    const crop = document.createElement('canvas');
    const top = Number($('ocrTop').value)/100, bottom = Number($('ocrBottom').value)/100;
    crop.width = $('ocrCanvas').width; crop.height = Math.max(1, Math.round($('ocrCanvas').height*(bottom-top)));
    crop.getContext('2d').drawImage(image, 0, image.height*top, image.width, image.height*(bottom-top), 0, 0, crop.width, crop.height);
    let activeWorker;
    timer = setTimeout(() => { if (token === generation) { reset(); $('ocrPanel').classList.remove('hidden'); status('時間がかかりすぎたため中止しました。通信状態と画像を確認して再度選んでください。'); } }, 120000);
    try {
      const engine = await loadEngine(); if (token !== generation) return;
      activeWorker = await engine.createWorker(['jpn', 'eng'], 1, {
        workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js',
        corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1',
        langPath:'https://tessdata.projectnaptha.com/4.0.0',
        logger:m => { if (token === generation) status(m.status === 'recognizing text' ? '文字を読み取っています… '+Math.round(m.progress*100)+'%' : '認識データを準備しています…'); }
      });
      if (token !== generation) return;
      worker = activeWorker;
      const { data } = await worker.recognize(crop);
      if (token !== generation) return;
      const lines = [...new Set(data.text.split(/\r?\n/).map(s => s.trim()).filter(Boolean))].slice(0,40);
      for (const line of lines) {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = line;
        button.style.cssText = 'display:block;width:100%;margin:6px 0;text-align:left;overflow-wrap:anywhere';
        button.onclick = () => {
          if ($('name').value.trim() && !confirm('現在の品名を選んだ候補で置き換えますか？')) return;
          $('name').value = line; reset(); $('name').focus();
        };
        $('ocrCandidates').append(button);
      }
      status(lines.length ? '候補を選ぶと品名欄に入ります。修正してから保存してください。' : '文字が見つかりません。範囲や写真を変えて再試行してください。');
    } catch { if (token === generation) status('読み取りに失敗しました。通信状態を確認して再試行するか、品名を手入力してください。'); }
    finally {
      if (activeWorker) await activeWorker.terminate().catch(() => {});
      if (token === generation) { clearTimeout(timer); worker = null; busy = false; draw(); }
      crop.width = crop.height = 1;
    }
  }
  window.resetNameOCR = reset;
  if (!/Android/i.test(navigator.userAgent)) return;
  $('nameOCR').classList.remove('hidden');
  $('ocrPhoto').onchange = select; $('ocrFile').onchange = select;
  $('ocrTop').oninput = draw; $('ocrBottom').oninput = draw;
  $('ocrRun').onclick = run; $('ocrCancel').onclick = reset;
})();
