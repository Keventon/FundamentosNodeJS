//Streams -> São pequenas partes de um dado que são lidos sem ser carregado por completo.

//Tudo que é digitado, é encaminhado para uma saída.
// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHandredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    //Chunk: Pedaço lido do Stream de leitura (this.push(buf)).
    //Encoding: Como a informação está codificada
    //Callback: Função chamada quando a Stream de escrita (Readable) acaba de fazer a ação que precisava com aquela informação.
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const tranformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(tranformed)));
  }
}

new OneToHandredStream()
  .pipe(new InverseNumberStream()) //Utilizada no meio da leitura e escrita
  .pipe(new MultiplyByTenStream());

//
