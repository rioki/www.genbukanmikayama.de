
function autolink(options) {
  const elemClass = (options && options.class) ? options.class : 'autolink';
  const linkText  = (options && options.linkText) ? options.linkText : '🔗';

  const elems = document.getElementsByClassName(elemClass);
  for (let i = 0; i < elems.length; i++) {
    const id = elems[i].id;
    let linkNode = document.createElement("a");
    linkNode.href = `#${id}`;
    linkNode.className = 'autolink-link';
    linkNode.style.display = "none";
    linkNode.innerHTML = linkText;
    elems[i].parentNode.insertBefore(linkNode, elems[i]);
    elems[i].onmouseover = () => {
      linkNode.style.display = "block";   
    };
    elems[i].onmouseout = () => {
      linkNode.style.display = "none"; 
    };
    linkNode.onmouseover = elems[i].onmouseover
    linkNode.onmouseout = elems[i].onmouseout
  }
}