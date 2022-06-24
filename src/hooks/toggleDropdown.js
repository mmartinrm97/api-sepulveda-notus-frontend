import { createPopper } from "@popperjs/core";

export default function toggleDropdown(event,dropdownPopoverShow) {

    event.preventDefault();
    if (dropdownPopoverShow) {
        dropdownPopoverShow = false;
    } else {
        dropdownPopoverShow = true;
        createPopper(btnDropdownRef, popoverDropdownRef, {
            placement: "bottom-start"
        })
    }
}