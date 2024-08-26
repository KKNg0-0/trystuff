// https://deno.land/std@0.194.0/http/server.ts?s=serve

import { serve } from "http/server.ts";
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from "http/file_server.ts";


/**
 * APIリクエストを処理する
 */
Deno.serve((request) => {
  // URLのパスを取得
  const pathname = new URL(request.url).pathname;
  console.log(`pathname = ${pathname}`);
  // パスが'/welcome-message'だったら「'jigインターンへようこそ！'」の文字を返す
  
  if (request.method === "GET" && pathname === "/welcome-message") {
    return new Response("jig.jpインターンへようこそ！👍");

  }

  // publicフォルダ内にあるファイルを返す
  return serveDir(request, {

    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});

