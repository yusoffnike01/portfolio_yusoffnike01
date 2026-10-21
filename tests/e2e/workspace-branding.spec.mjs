import {test,expect} from '@playwright/test';

test('workstation contains a rendered Apple lid logo and AOC monitor branding on both sides',async({page})=>{
 await page.goto('/en/');
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','interactive',{timeout:30000});
 const result=await page.frameLocator('iframe').locator('body').evaluate(()=>{
  const labels=[];
  window.__deskReview.setup.traverse(object=>{
   if(!object.isMesh||!object.userData.branding)return;
   const canvas=object.material.map?.image;
   labels.push({name:object.name,branding:object.userData.branding,text:object.userData.text,hasTexture:Boolean(canvas?.width),hasPixels:canvas?canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((v,i)=>i%4===3&&v>0):false});
  });
  return labels;
 });
 expect(result).toHaveLength(3);
 expect(result.find(x=>x.name==='macbook-apple-logo')).toMatchObject({branding:'apple-logo',hasTexture:true,hasPixels:true});
 for(const name of ['monitor-aoc-front','monitor-aoc-back'])expect(result.find(x=>x.name===name)).toMatchObject({branding:'monitor-aoc',text:'AOC',hasTexture:true,hasPixels:true});
});
