const { chromium } = require('/home/rafael/Documentos/Clases/e-commerce1/urbanshop/node_modules/playwright');
const fs = require('fs');

const SRC = '/home/rafael/Documentos/Clases/e-commerce1/mockups';
const OUT = '/home/rafael/Documentos/Clases/e-commerce1/mockups/png';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const targets = [
    { file: '00-marca', name: 'urbanshop-marca', desktop: true, mobile: false },
    { file: '01-home', name: 'urbanshop-01-home', desktop: true, mobile: true },
    { file: '02-producto', name: 'urbanshop-02-producto', desktop: true, mobile: true },
    { file: '03-carrito', name: 'urbanshop-03-carrito', desktop: true, mobile: true },
    { file: '04-checkout', name: 'urbanshop-04-checkout', desktop: true, mobile: true },
    { file: '05-confirmacion', name: 'urbanshop-05-confirmacion', desktop: true, mobile: true },
  ];
  for (const t of targets) {
    const shots = [];
    if (t.desktop) shots.push({ label: 'desktop', width: 1440, height: 900 });
    if (t.mobile) shots.push({ label: 'movil', width: 390, height: 844 });
    for (const s of shots) {
      const page = await browser.newPage({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: 2 });
      await page.goto(`file://${SRC}/${t.file}.html`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(350);
      await page.screenshot({ path: `${OUT}/${t.name}-${s.label}.png`, fullPage: true });
      await page.close();
      console.log(`${t.name}-${s.label}.png`);
    }
  }
  await browser.close();
})();
