// メモリを大量に消費するコード
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec orci nibh. Sed nec neque velit. Proin ultricies, lacus ac semper scelerisque, dui quam convallis eros, eget ultricies quam mauris nec lectus. Ut pretium scelerisque leo, ac ultricies velit scelerisque nec. Aenean scelerisque mi ac mi egestas, sed tristique enim convallis.";

for (let i = 0; i < 100000; i++) {
  document.body.innerHTML += text;
}


