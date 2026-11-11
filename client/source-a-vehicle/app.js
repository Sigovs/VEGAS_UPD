'use strict';
const form = document.getElementById('sourcing-form');
const byId = id => document.getElementById(id);
const phone = byId('phone');
const errorSummary = byId('error-summary');
const fields = ['firstName','lastName','email','phone','message','yearMin','yearMax','budgetMin','budgetMax','mileage'];
function setError(id, message) { const field = byId(id); field.setAttribute('aria-invalid', message ? 'true' : 'false'); byId(id + '-error').textContent = message; }
function syncPhone() {
 const required = byId('contact').value === 'phone' || byId('smsMarketing').checked;
 phone.required = required;
 byId('phone-required').hidden = !required;
 byId('phone-optional').hidden = required;
 byId('phone-hint').textContent = byId('contact').value === 'phone' ? 'Required because you selected phone contact.' : byId('smsMarketing').checked ? 'Required because you selected text-message updates.' : 'Optional when email is preferred.';
 if (!required) setError('phone', '');
}
byId('contact').addEventListener('change', syncPhone);
byId('smsMarketing').addEventListener('change', syncPhone);
byId('tradeIn').addEventListener('change', event => {byId('trade-details-field').hidden = !['yes','maybe'].includes(event.target.value);});
for (const card of document.querySelectorAll('[data-intent]')) {
 card.addEventListener('click', () => {
   form.querySelector('input[name="searchIntent"][value="' + card.dataset.intent + '"]').checked = true;
   byId('request').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
   byId('firstName').focus({preventScroll: true});
 });
}
for (const id of fields) byId(id).addEventListener('input',()=>{if(byId(id).getAttribute('aria-invalid')==='true') setError(id,'');});
function validate() {
 const errors = [];
 const fail = (id,message) => {setError(id,message);errors.push(id);};
 fields.forEach(id=>setError(id,''));
 for (const [id,label] of [['firstName','your first name'],['lastName','your last name'],['message','a message about your search']]) if(!byId(id).value.trim()) fail(id,'Please enter '+label+'.');
 if(!byId('email').value.trim()) fail('email','Please enter your email address.');
 else if(!byId('email').validity.valid) fail('email','Please enter a valid email address, such as you@example.com.');
 const digits = phone.value.replace(/\D/g,'');
 if(phone.required && !phone.value.trim()) fail('phone',byId('contact').value==='phone'?'Please enter a phone number because you selected phone contact.':'Please enter a phone number for text-message updates.');
 else if(phone.value.trim() && (digits.length<7 || digits.length>15 || /[^\d\s()+.\-]/.test(phone.value))) fail('phone','Please enter a valid phone number, including area or country code.');
 for(const id of ['yearMin','yearMax']) if(byId(id).value && (!Number.isInteger(Number(byId(id).value))||Number(byId(id).value)<1900||Number(byId(id).value)>2027)) fail(id,'Please enter a year from 1900 to 2027.');
 for(const id of ['budgetMin','budgetMax','mileage']) if(byId(id).value && (Number(byId(id).value)<0||!Number.isFinite(Number(byId(id).value)))) fail(id,'Please enter zero or a positive number.');
 for(const [min,max,label] of [['yearMin','yearMax','year'],['budgetMin','budgetMax','budget']]) if(byId(min).value && byId(max).value && Number(byId(min).value)>Number(byId(max).value)) fail(max,'The upper '+label+' must be at least the lower '+label+'.');
 errorSummary.hidden = !errors.length;
 if(errors.length) {
  if(errors.some(id=>['yearMin','yearMax','budgetMin','budgetMax','mileage'].includes(id))) document.querySelector('.refine').open=true;
  errorSummary.textContent = 'Please check '+errors.length+' highlighted '+(errors.length===1?'field':'fields')+'.';
  byId(errors[0]).focus();
 }
 return !errors.length;
}
function addSummary(label,value) { if(!value)return; const dt=document.createElement('dt'),dd=document.createElement('dd'); dt.textContent=label;dd.textContent=value;byId('request-summary').append(dt,dd); }
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!validate())return;
 byId('request-summary').replaceChildren();
 addSummary('Search direction',form.querySelector('input[name="searchIntent"]:checked').value==='specific'?'Find a specific vehicle':'Get help choosing');
 addSummary('Name',byId('firstName').value.trim()+' '+byId('lastName').value.trim());
 addSummary('Contact preference',byId('contact').value==='email'?'Email · '+byId('email').value:'Phone · '+phone.value);
 addSummary('Email',byId('contact').value==='phone'?byId('email').value:'');
 addSummary('Your brief',byId('message').value.trim());
 addSummary('Make / model',[byId('make').value,byId('model').value].filter(Boolean).join(' · '));
 if(byId('yearMin').value||byId('yearMax').value)addSummary('Year range',(byId('yearMin').value||'Open')+' to '+(byId('yearMax').value||'Open'));
 if(byId('budgetMin').value||byId('budgetMax').value)addSummary('Budget (USD)',(byId('budgetMin').value?'$'+Number(byId('budgetMin').value).toLocaleString('en-US'):'Open')+' to '+(byId('budgetMax').value?'$'+Number(byId('budgetMax').value).toLocaleString('en-US'):'Open'));
 addSummary('Color / specifications',byId('specs').value);
 addSummary('Maximum mileage',byId('mileage').value?Number(byId('mileage').value).toLocaleString('en-US')+' miles':'');
 addSummary('Timeframe',byId('timeframe').value);
 addSummary('Trade-in',byId('tradeIn').value ? byId('tradeIn').selectedOptions[0].textContent + (['yes','maybe'].includes(byId('tradeIn').value)&&byId('tradeDetails').value?' · '+byId('tradeDetails').value:'') : '');
 addSummary('Optional marketing choices',[byId('emailMarketing').checked?'Email selected':null,byId('smsMarketing').checked?'Text messages selected':null].filter(Boolean).join(' · ')||'Neither selected');
 byId('preview-dialog').showModal();
});
byId('privacy-link').addEventListener('click',event=>{event.preventDefault();byId('privacy-dialog').showModal();});
for(const dialog of document.querySelectorAll('dialog')){
 for(const button of dialog.querySelectorAll('.dialog-close,.dialog-done'))button.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
syncPhone();
