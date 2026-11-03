'use strict';
(()=>{
const hero=document.querySelector('.photo-carousel');if(!hero)return;
const slides=[
 {topic:'AUDIT & COMPLIANCE',title:'Get your compliance work moving',description:'You know what you need to achieve. We help your team work out what is missing, make the changes and prepare the evidence.',link:'audit-compliance.html',label:'Explore audit & compliance'},
 {topic:'IMPLEMENTATION',title:'Put the plan into practice',description:'Policies are a starting point. We work with the people who run your systems and processes to turn agreed actions into everyday practice.',link:'security-implementation.html',label:'How we help with implementation'},
 {topic:'REVIEW & ASSURANCE',title:'Be ready for the next review',description:'Bring the records together, check what is complete and deal with the gaps. Your team should know what is ready and what still needs work.',link:'assurance-preparation.html',label:'Prepare for your next review'}
];
const track=hero.querySelector('.carousel-track'),buttons=[...hero.querySelectorAll('[data-hero-slide]')],toggle=hero.querySelector('.carousel-toggle'),status=hero.querySelector('#carousel-status'),motion=matchMedia('(prefers-reduced-motion: reduce)');
let index=0,timer=null,paused=motion.matches,hover=false,inView=true,touch=null;
function syncToggle(){toggle.textContent=paused?'Play':'Pause';toggle.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow')}
function schedule(){clearTimeout(timer);timer=null;if(paused||hover||!inView||document.hidden)return;timer=setTimeout(()=>{show((index+1)%slides.length,false);schedule()},8000)}
function pause(){paused=true;syncToggle();schedule()}
function show(next,manual=true){index=(next+slides.length)%slides.length;const item=slides[index];track.style.transform='translate3d(-'+index*100+'%,0,0)';hero.querySelector('#hero-topic').textContent=item.topic;hero.querySelector('#hero-heading').textContent=item.title;hero.querySelector('#hero-description').textContent=item.description;const link=hero.querySelector('#hero-service-link');link.href=item.link;link.querySelector('.hero-link-label').textContent=item.label;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));hero.dataset.activeSlide=String(index);if(manual){pause();status.textContent='Slide '+(index+1)+' of '+slides.length+': '+item.topic.toLowerCase()}const image=track.children[index].querySelector('img');image.loading='eager'}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>show(i));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%slides.length;if(e.key==='ArrowLeft')next=(i+slides.length-1)%slides.length;if(e.key==='Home')next=0;if(e.key==='End')next=slides.length-1;if(next!==undefined){e.preventDefault();show(next);buttons[next].focus()}})});
hero.querySelector('.carousel-prev').addEventListener('click',()=>show(index-1));hero.querySelector('.carousel-next').addEventListener('click',()=>show(index+1));
toggle.addEventListener('click',()=>{paused=!paused;syncToggle();schedule()});
hero.addEventListener('focusin',event=>{if(event.target===toggle){clearTimeout(timer);timer=null}else if(!paused)pause()});
hero.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;schedule()}});hero.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hover=false;schedule()}});
hero.addEventListener('touchstart',e=>{if(e.touches.length===1&&!e.target.closest('a,button'))touch={x:e.touches[0].clientX,y:e.touches[0].clientY};else touch=null},{passive:true});
hero.addEventListener('touchend',e=>{if(!touch||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)show(index+(dx<0?1:-1))},{passive:true});
hero.addEventListener('touchcancel',()=>{touch=null},{passive:true});
document.addEventListener('visibilitychange',schedule);
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(hero);
motion.addEventListener('change',()=>{if(motion.matches)pause()});
syncToggle();hero.dataset.activeSlide='0';schedule();
})();

