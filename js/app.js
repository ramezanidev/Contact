
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Variables
var $ = document;
_cls = a => $.getElementsByClassName(a);
_id = a => $.getElementById(a);

var contact_name = _id('contact_name');
var contact_num = _id('contact_num');
var add_contact_btn = _id('add_contact_btn');
var listGroup = document.getElementsByTagName('ul')[0];
var contact_model_name = _id('contact_model_name');
var contact_model_phone = _id('contact_model_phone');
var namesDom =  _cls('name');
var numsDom =  _cls('phone');
var call_btn = _id('call_btn');
var edit_contact_input_name = _id('edit_contact_input_name');
var edit_contact_input_num = _id('edit_contact_input_num');
var contact_items = _cls('contact_items')[0];
var contact_edit = _cls('contact_edit')[0];
var contact_model = _cls("contact_model")[0]
var contact_items_edit = _cls('contact_items_edit')[0];
var add_model =  _cls("add_model")[0];
var add_contact = _cls('add_contact')[0];
var search_input = _id("search_input");
var contact_items_delete = _cls("contact_items_delete")[0];
var membersArrey = [];
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Read localStorage

!function readelocalStorage(){
    try{
        let members = localStorage.members;
        members = JSON.parse(members);
        membersArrey = members;
        for (let i = 0; i < members.length; i++) {
            const obj = members[i];
            let name = obj.name;
            let num = obj.num;
            createElement(name, num)
        }
    }catch(err){
        console.log(err.message);
    }
}()
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! open model add contact

add_contact.addEventListener('click', () => {
    add_model.classList.toggle("add_model--show");
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! close model add contact

add_model.addEventListener('click', (e) => {
    if (e.target.id === "add_model") {
        add_model.classList.toggle("add_model--show");
        contact_name.value = '';
        contact_num.value = '';
    }
})
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! close model  contact

contact_model.addEventListener('click', (e) => {
    if (e.target.id === "contact_model") {
        contact_model.classList.toggle("contact_model--show");
    }
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  add new contact

add_contact_btn.addEventListener('click', () => {
    if(contact_num.value.length == 11 && contact_name.value.length > 2){
        createElement(contact_name.value, contact_num.value);
        addArrey(contact_name.value,contact_num.value);
        _cls("add_model")[0].classList.toggle("add_model--show");
        contact_name.value = '';
        contact_num.value = '';
    }else{
        alert('false')
    }
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! create new li element

function createElement(name, num) {
    let el = document.createElement('li');
    let nameEl = document.createElement('div');
    let numEl = document.createElement('div');
    nameEl.className = 'name';
    numEl.className = 'phone';
    nameEl.innerHTML = name;
    numEl.innerHTML = num;
    el.appendChild(nameEl);
    el.appendChild(numEl);
    listGroup.appendChild(el)
    el.addEventListener('click', (e) => {
        switch (e.target.tagName) {
            case 'LI':
                contact_model_name.innerHTML = e.target.getElementsByClassName('name')[0].innerHTML;
                contact_model_phone.innerHTML = e.target.getElementsByClassName('phone')[0].innerHTML;
                break;
            case 'DIV':
                contact_model_name.innerHTML = e.target.parentNode.getElementsByClassName('name')[0].innerHTML;
                contact_model_phone.innerHTML = e.target.parentNode.getElementsByClassName('phone')[0].innerHTML;
                break;
            default:
                break;
        }
        contact_model.classList.toggle("contact_model--show");
        call_btn.href = 'tel:+98'+ contact_model_phone.innerHTML
    })
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! add in Arrey

function addArrey(name,num) {
    membersArrey[membersArrey.length] = {name:name,num:num};
    addlocalStorage()
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! add localStorage
addlocalStorage = () =>localStorage.setItem("members",JSON.stringify(membersArrey))



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! search

search_input.addEventListener('keyup',(e)=>{
    search = e.target.value;
    let names = _cls("name");
    if(search === ''){
        for (let i = 0; i < names.length; i++) {
            const element = names[i];
            element.parentNode.style.display = 'block'
        }
    }else{
        for (let i = 0; i < names.length; i++) {
            const element = names[i];
            if(element.innerHTML.indexOf(search) == -1){
                element.parentNode.style.display = 'none'
            }else{
                element.parentNode.style.display = 'block'
            }
        }
    }
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! delete item
contact_items_delete.addEventListener('click',()=>{
    deleteItem(contact_model_name.innerHTML,contact_model_phone.innerHTML)
})
function deleteItem(name,num){
    for (var i = 0; i < membersArrey.length; i++) {
        var element = membersArrey[i];
        if(element.name===name && element.num===num){
            membersArrey.splice(i,1);
            addlocalStorage()
            for (var a = 0; a < namesDom.length; a++) {
                const nameDom = namesDom[a];
                const numDom = numsDom[a];
                if(nameDom.innerHTML===name&&numDom.innerHTML===num){
                    listGroup.removeChild(nameDom.parentNode)
                    break;                
                }
            }
            contact_model.classList.toggle("contact_model--show");
        }
    }
}



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! edit item
contact_items_edit.addEventListener('click',()=>{
    contact_items.style.display = "none";
    contact_edit.style.display = "flex";
    edit_contact_input_name.value = contact_model_name.innerHTML;
    edit_contact_input_num.value = contact_model_phone.innerHTML;
})
_id('edit_contact_btn').addEventListener('click',()=>{
    for (var i = 0; i < membersArrey.length; i++) {
        var element = membersArrey[i];
        if(element.name===contact_model_name.innerHTML && element.num===contact_model_phone.innerHTML){
            element.name = edit_contact_input_name.value;
            element.num = edit_contact_input_num.value;
            addlocalStorage()
            for (var a = 0; a < namesDom.length; a++) {
                const nameDom = namesDom[a];
                const numDom = numsDom[a];
                if(nameDom.innerHTML===contact_model_name.innerHTML&&numDom.innerHTML===contact_model_phone.innerHTML){
                    nameDom.innerHTML = edit_contact_input_name.value
                    numDom.innerHTML = edit_contact_input_num.value
                    break;              
                }
            }
        }
    }
    contact_items.style.display = "flex";
    contact_edit.style.display = "none";
    contact_model.classList.toggle("contact_model--show");
})