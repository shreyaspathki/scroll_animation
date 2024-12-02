const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");



const frames = {
    currentIndex :59,
    maxIndex :1537
};

let imgLoaded = 0;
const images = [];

function preLoadImages(){
    for(var i=59;i<=frames.maxIndex;i++){
        const imgUrl = `./frames/frame_${i.toString().padStart(4,'0')}.jpeg`;
        const img = new Image();
        img.src = imgUrl;
        // console.log(imgUrl);
        img.onload = () => {
            imgLoaded++;
            console.log(`Loaded ${imgLoaded} out of ${frames.maxIndex - frames.currentIndex + 1} images`);
            if(imgLoaded === (frames.maxIndex - frames.currentIndex + 1)){
                console.log("All images loaded");
                loadImages(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}


function loadImages(index){
   if(index >= 58 && index <= frames.maxIndex){
    const img = images[index - 58];
    // console.log(canvas);
    canvas.width =window.innerWidth;
    canvas.height =window.innerHeight;
    const scalex = canvas.width / img.width;
    const scaley = canvas.height / img.height;
    const scale = Math.max(scalex,scaley);
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;
    const offsetX = (canvas.width - newWidth)/ 2;
    const offsetY =(canvas.height - newHeight)/ 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
   
    context.drawImage(img, offsetX,offsetY, newWidth, newHeight);
    frames.currentIndex = index;
   }

}

function startAnimation(){
    var t1 = gsap.timeline({
    scrollTrigger :{
        trigger : ".parent",
        start : "top top",
        scrub : 2,
        // pin : true,
        // markers : true
    }
})

t1.to(frames, { 
    currentIndex : frames.maxIndex, 
    onUpdate :function(){
      loadImages(Math.floor(frames.currentIndex))
        }
    })
}


preLoadImages(); 