console.clear()

const c = document.querySelector('canvas')
const ctx = c.getContext('2d')
let cw = c.width = innerWidth
let ch = c.height = innerHeight
const parts = Array(230)
const img = new Image(56,56)
img.src = 'data:image/webp;base64,UklGRnwCAABXRUJQVlA4WAoAAAAQAAAAOAAAOAAAQUxQSDUBAAARgJrtnyLnf2gprJOtYG0YbHTcobwCohl7YGZQJEdm/BaQKSA0cv/HN/v/pYCIcOS2kSNRs+cc3F8gt/zS7r02NrRG3++WfJJqYUNxr9TGgoC+6jO79VztiyZdfmf33svpCKaPOVrH085qAUctqLkZ2WOJ9kYcePss077X+3bGUp31ukb2Wa79ke72WLK97nfEsnW7n+lAWDDd+Tk9ZumO0+3KLF+5/fv0DvCebakyokLLM8QzES0wpimiDZAVIgXyQj6j8kowi7swy/cwVxpGGxhjYWwIE1qYLwPzqWE+gJ+fXZjVEswS8FtJCkThfnnWcb9109BfV6pCVFsymH8Q8H8WpQD/kilqb1z+fxm3BIDbo6sh0bUzBNxXvRoVW3RjuA0JW624nYxb5rCzwP85feDOOwQAVlA4ICABAADwBgCdASo5ADkAPmk0mk0jrqQb/VAoBoABcjBpjav6PQBvAG8eAwnI+whDTkakCLRf8j9L/oFAONiHhpps25nQAOQ//1ZP/9w8f/+uhni54ZmDUmnA/yy8+GYYC6PzOGkqxMzAVolGISiAaDvOo+AetHciJHzvvOO79RngGuNH+zKFv6wmGQ1yPfyNLBNpDKbAKu/bBygT0Q1QhGJt5HUQucgwA/6G4lGO2dX4o4s4I99wfvAbao93srKY3GcncyQ1qvDoBYXTlhQU3iO1Jz0BRwGAEf/Oa6jji+5Dogc0/bA+7XB/3UYn/9qTAYagNjGEMUryHsAiwK5soxRFi00PBX/ka2P+jqA7nq8pce9fUruTfnGMerpcrc3eYc2AAAA='

img.onload = ()=>{

  const xDist = 59
  const yDist = 84
  const freq = 4.3
  
  for (let i=0; i<parts.length; i++) {

    parts[i] = {
      x: -xDist,
      y: gsap.utils.interpolate(-yDist, yDist, i/parts.length)
    }
    
    parts[i].tween = gsap.to(parts[i], {
      duration:2.3,
      ease:'sine.inOut',
      yoyo:true,
      repeat:-1,
      x:xDist      
    })
    .progress( i/parts.length * freq )
    
  }
}

gsap.ticker.add(()=>{
  ctx.clearRect(0,0,cw,ch)
  parts.forEach((pt,i)=> {
    ctx.translate(cw/2, ch/2)
    ctx.drawImage(img, -img.width/2+pt.x, -img.height/2+pt.y, img.width, img.height)
    ctx.translate(-cw/2, -ch/2)
  })  
})

window.addEventListener('resize', ()=>{
  cw = c.width = innerWidth
  ch = c.height = innerHeight
})

window.addEventListener('pointerup', ()=>{ // toggle play / pause
  parts.forEach( pt => gsap.to(pt.tween, {duration:1, timeScale:pt.tween.isActive()?0:1}) )
})
