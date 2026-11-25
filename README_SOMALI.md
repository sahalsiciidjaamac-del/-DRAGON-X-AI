# DRAGON X AI v2.0

Mashruucan waa bilow shaqayn kara (starter) oo loogu talagalay DRAGON X AI.

## Waxa hadda shaqaynaya
- Dashboard responsive ah oo ku habboon telefoon iyo computer.
- AI Chat, Code Generator, Website Builder, iyo App planning modes.
- Gemini API waxaa loogu yeerayaa server-ka, API key-guna browser-ka kama muuqdo.
- Website Builder wuxuu HTML ka soo saara AI wuxuuna ku tusaa Live Preview.
- Projects waxaa lagu kaydiyaa localStorage ee browser-ka/telefoonka.
- PWA manifest iyo service worker ayaa diyaar u ah rakibidda marka website-ka HTTPS lagu daabaco.

## Waxa aan weli ku jirin
- APK Android native ah lama compile-gareeyo.
- Kaydinta projects-ka waa localStorage; browser/device kale lama wadaago.
- Ma jiro login/user database ama ZIP export weli.

## Sida loo shido
1. Ku rakib Node.js 18 ama ka cusub.
2. Fur folder-kan terminal.
3. Orod `npm install`.
4. Nuqul ka samee `.env.example` oo ugu magac dar `.env`.
5. Ku qor Gemini API key-ga gudaha `.env` oo keliya:
   `GEMINI_API_KEY=...`
6. Orod `npm start`.
7. Fur `http://localhost:3000`.

## Amniga API key
- Ha gelin API key-ga `public/app.js`, HTML, ama GitHub.
- Ha ku soo dirin API key-ga chat-kan.
- Marka Render/hosting la isticmaalayo, key-ga geli Environment Variables.
- Free-tier quota iyo helitaanka model-ku way is beddeli karaan; isticmaalka bilaashka ah ma aha mid aan xad lahayn.

## Hosting
Waxaa lagu daabici karaa adeeg Node.js hosting taageera. Marka la deploy-gareynayo, geli `GEMINI_API_KEY` sida environment variable. PWA install wuxuu u baahan yahay HTTPS.
