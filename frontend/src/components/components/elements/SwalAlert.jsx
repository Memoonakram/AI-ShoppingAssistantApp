import Swal from 'sweetalert2';

export const SwalAlert = (title, text, timer, icon, showConfirm) => {
    Swal.fire({
        title: title,
        text: text,
        // check for timer or assign 2000 for default
        timer: timer? timer : 2000,
        icon: icon,
        showConfirmButton: showConfirm? showConfirm : false,
        customClass: {
            confirmButton: "btn bg-indigo-500 text-white",
            popup: "bg-lightmode dark:bg-navy-800 dark:text-navy-100",
        },
    })
}