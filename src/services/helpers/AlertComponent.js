import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const showalert = (titre, text, icon) => {
    MySwal.fire({
        title: titre,
        text: text,
        icon: icon
    })
}

export const alertwithcalback = (titre, text, icon, callback) => {
    MySwal.fire({
        title: titre,
        text: text,
        icon: icon,
        showCancelButton: false,
        confirmButtonColor: "#3085d6"
      }).then((result) => {
        if (result.isConfirmed) {
          callback()
        }
    });
}

