/**
 * Created by user on 01.09.2015.
 */
//
    // Anti-Spam Email Cloaking 3.0 by David Tulga
    // http://www.davidtulga.com/antispamemail.htm
    //
function dimaMail() {
    var x = '&#64;';
    var eml = '&#51;&#51;&#51;&#51;&#51;&#51;&#121;' + x + '&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
    var msg = '&#51;&#51;&#51;&#51;&#51;&#51;&#121;' + x + '&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
    var out = '<a class="cloak_eml"  href="mailto:' + eml + '">' + msg + '</a>';
    document.getElementById('dima-mail').innerHTML+=out;
}

function jenyaMail(){
    var x = '&#64;';
    var eml = '&#109;&#121;&#114;&#117;&#97;&#108;&#97;' + x + '&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
    var msg = '&#109;&#121;&#114;&#117;&#97;&#108;&#97;' + x + '&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
    var out = '<a class="cloak_eml" href="mailto:' + eml + '">' + msg + '</a>';
    document.getElementById('jenya-mail').innerHTML+=out;
}

window.onload = function() {
    dimaMail();
    jenyaMail();
};
