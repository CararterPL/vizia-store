export default function proxy(request: Request) {
  // Przepuszczamy wszystko bez żadnych przekierowań na /pl
  return;
}

export const config = {
  // Wykluczamy pliki systemowe, resztę puszczamy wolno
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}