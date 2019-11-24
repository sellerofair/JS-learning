"use strict";

tree.content[0] = new Folder("Music");
tree.content[0].content[0] = new File("bing.mp3");
tree.content[0].content[1] = new File("bang.flac");

tree.content[0].content[2] = new Folder("Rock");
tree.content[0].content[2].content[0] = new File("nananana.mp3");
tree.content[0].content[2].content[1] = new File("The Sharpest Lives.mp3");
tree.content[0].content[2].content[2] = new File("Over and Over.flac");

tree.content[0].content[3] = new Folder("Rap");
tree.content[0].content[3].content[0] = new File("skja.mp3");
tree.content[0].content[3].content[1] = new File("rrrraattttata.mp3");
tree.content[0].content[3].content[2] = new File("hey yo.flac");

tree.content[1] = new Folder("Images");
tree.content[1].content[0] = new File("something.img");
tree.content[1].content[1] = new File("anything.jpg");

tree.content[1].content[2] = new Folder("Photos");
tree.content[1].content[2].content[0] = new File("me.png");
tree.content[1].content[2].content[1] = new File("wife.jpg");
tree.content[1].content[2].content[2] = new File("daughter.gif");

tree.content[1].content[3] = new Folder("Pictures");
tree.content[1].content[3].content[0] = new File("forest.png");
tree.content[1].content[3].content[1] = new File("mountain.jpg");
tree.content[1].content[3].content[2] = new File("sea.gif");

tree.content[2] = new File("info.txt");
tree.content[3] = new File("readme.pdf");

printTree(tree);