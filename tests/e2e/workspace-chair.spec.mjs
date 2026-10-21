import {test,expect} from '@playwright/test';

 test('workstation renders a tan Tomaz-style chair with black pillows and local wordmarks',async({page})=>{
 await page.goto('/en/');
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','interactive',{timeout:30000});
 const result=await page.frameLocator('iframe').locator('body').evaluate(()=>{
  const setup=window.__deskReview.setup;
  setup.updateMatrixWorld(true);
  const chair=setup.getObjectByName('empty-chair'),back=setup.getObjectByName('chair-backrest');
  const base=chair.worldToLocal(back.localToWorld(back.position.clone().set(0,0,0)));
  const top=chair.worldToLocal(back.localToWorld(back.position.clone().set(0,1,0)));
  const backDirection=top.sub(base).normalize();
  return {
   chair:setup.getObjectByName('empty-chair').userData,
   seatBackDegrees:backDirection.angleTo(backDirection.clone().set(0,0,-1))*180/Math.PI,
   leansAwayFromDesk:backDirection.z>0,
   parts:['chair-tan-back','chair-tan-seat','chair-head-pillow','chair-lumbar-pillow','chair-tomaz-wordmark','chair-tomaz-wordmark-rear'].map(name=>{
    const object=setup.getObjectByName(name),canvas=object?.material.map?.image;
    return {name,exists:Boolean(object),color:object?.material.color.getHexString(),hasPixels:canvas?canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((v,i)=>i%4===3&&v>0):false};
   })
  };
 });
 expect(result.chair).toMatchObject({model:'Tomaz Syrix II',color:'brown'});
 expect(result.leansAwayFromDesk).toBe(true);
 expect(result.seatBackDegrees).toBeCloseTo(100,5);
 for(const name of ['chair-tan-back','chair-tan-seat'])expect(result.parts.find(p=>p.name===name)).toMatchObject({exists:true,color:'b47b49'});
 for(const name of ['chair-head-pillow','chair-lumbar-pillow'])expect(result.parts.find(p=>p.name===name)).toMatchObject({exists:true,color:'111316'});
 for(const name of ['chair-tomaz-wordmark','chair-tomaz-wordmark-rear'])expect(result.parts.find(p=>p.name===name)).toMatchObject({exists:true,hasPixels:true});
});
