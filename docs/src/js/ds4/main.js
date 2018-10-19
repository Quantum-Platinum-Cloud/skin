function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

function querySelectorAllToArray(selector, parentNode) {
    parentNode = parentNode || document;
    return nodeListToArray(parentNode.querySelectorAll(selector));
}

// TOOLTIP WIDGETS - Expand/Collapse only
querySelectorAllToArray('.tooltip').forEach(function(el, index) {
    var $widgetEl = $(el);
    var $buttonEl = $(el.querySelector('button'));

    $buttonEl.on('focus', function(e) {
        $buttonEl.attr('aria-expanded', ($buttonEl.attr('aria-expanded') === 'true') ? 'false' : 'true');
    });

    $buttonEl.blur('blur', function(e) {
        $buttonEl.attr('aria-expanded', 'false');
    });

    $buttonEl.on('mouseover', function(e) {
        $buttonEl.attr('aria-expanded', 'true');
    });

    $widgetEl.on('mouseleave', function(e) {
        $buttonEl.attr('aria-expanded', 'false');
    });
});

// BUBBLE HELP WIDGETS - Expand/Collapse only
querySelectorAllToArray('.bubblehelp').forEach(function(el, index) {
    var $buttonEl = $(el.querySelector('button'));

    $buttonEl.on('click', function(e) {
        $buttonEl.attr('aria-expanded', ($buttonEl.attr('aria-expanded') === 'true') ? 'false' : 'true');
    });
});

// EXPAND BUTTONS - Toggle state
querySelectorAllToArray('.expand-btn-example').forEach(function(el, index) {
    var $buttonEl = $(el);

    $buttonEl.on('click', function(e) {
        $buttonEl.attr('aria-expanded', ($buttonEl.attr('aria-expanded') === 'true') ? 'false' : 'true');
    });
});

// COMBOBOX WIDGETS - Expand/Collapse only
querySelectorAllToArray('.combobox').forEach(function(el, index) {
    var $inputWrapperEl = $(el.querySelector('.combobox__control'));
    var $inputEl = $(el.querySelector('input'));

    $inputEl.on('focus', function(e) {
        var isExpanded = $inputEl.attr('aria-expanded') === 'true';
        if (isExpanded) {
            $inputWrapperEl.removeClass('combobox__control--expanded');
        } else {
            $inputWrapperEl.addClass('combobox__control--expanded');
        }
        $inputEl.attr('aria-expanded', isExpanded === true ? 'false' : 'true');
    });

    $inputEl.on('blur', function(e) {
        $inputEl.attr('aria-expanded', 'false');
        $inputWrapperEl.removeClass('combobox__control--expanded');
    });
});

// LISTBOX, MENU AND FAKE MENU WIDGETS - Expand/Collapse only
querySelectorAllToArray('.listbox, .menu, .fake-menu').forEach(function(el) {
    var $buttonEl = $(el.querySelector('button'));

    $buttonEl.on('click', function(e) {
        var isExpanded = $buttonEl.attr('aria-expanded');
        $buttonEl.attr('aria-expanded', isExpanded === 'true' ? 'false' : 'true');
    });

    $buttonEl.on('blur', function(e) {
        $buttonEl.attr('aria-expanded', 'false');
    });
});

// DIALOG BUTTONS - Open/Close dialog only (no modal behaviour)
querySelectorAllToArray('.dialog-button').forEach(function(btn) {
    var dialog = btn.nextElementSibling;
    var dialogBody = dialog.querySelector('.dialog__body');
    var dialogClose = dialog.querySelector('.dialog__close');
    btn.addEventListener('click', handleOpen);

    function handleOpen() {
        dialog.removeAttribute('hidden');
        btn.removeEventListener('click', handleOpen);
        dialog.addEventListener('click', handleClose, true);
        document.body.setAttribute("style", "overflow:hidden");
        dialogClose.focus();
    }

    function handleClose(ev) {
        if (dialogBody.contains(ev.target)) {
            return;
        }

        dialog.setAttribute('hidden', '');
        btn.addEventListener('click', handleOpen);
        dialog.removeEventListener('click', handleClose, true);
        document.body.removeAttribute("style");

        btn.focus();
    }
});
