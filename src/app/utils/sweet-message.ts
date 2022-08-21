import swal, { SweetAlertIcon } from "sweetalert2"

export class SweetMessage {
    static success(message: string) {
      swal.fire("Success", message, "success");
    }
  
    static error(message: string) {
      swal.fire("Error", message, "error");
    }
  
    static info(message: string) {
      swal.fire("Info", message, "info");
    }
  
    static warning(message: string) {
      swal.fire("Warning", message, "warning");
    }
  
    show(message: string, success: boolean) {
      let type: SweetAlertIcon = success ? "success" : "error";
      swal.fire(type.toUpperCase(), message, type);
    }
  
    static confirm(title: string, message: string) {
      return swal.fire({
        title: title,
        text: message,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: '#d33'
      })
    }
  
    static deleteConfirm() {
      return swal.fire({
        title: "Delete",
        text: "Do you really want to delete permanently ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: '#d33'
      })
    }
  }
  