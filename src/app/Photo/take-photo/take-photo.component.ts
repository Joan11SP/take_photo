import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-take-photo",
  templateUrl: "./take-photo.component.html",
  styleUrls: ["./take-photo.component.css"],
})
export class TakePhotoComponent implements OnInit {
  //variables para poder acceder al DOM
  @ViewChild("video", { static: true }) video: ElementRef;

  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  constructor(private renderer: Renderer2, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.ngAfterViewInit();
  }
  //Al iniciar la app comprobar si tiene permisos para encender la camara auto
  public async ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(this.attachVideo.bind(this))
        .then(() => {
          setTimeout(() => {
            this.capture();
          }, 3000);
        })
        .catch((err) => {
          console.error(`Error ${err.message}`);
          this.openSnackBar('Conceda los permisos para utilizar la camara')
        });
    } else {
      alert("Camara desactivada");
      console.log("Camara desactivada");
    }
  }
  attachVideo(stream) {
    this.renderer.setProperty(this.video.nativeElement, "srcObject", stream);
    this.renderer.listen(this.video.nativeElement, "play", (event) => {
      this.videoHeight = this.video.nativeElement.videoHeight;
      this.videoWidth = this.video.nativeElement.videoWidth;
    });
  }
  //capturar la imagen del video
  public capture() {
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "width",
      this.videoHeight
    );
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "height",
      this.videoHeight
    );
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.video.nativeElement, 0, 0);
    console.log(this.canvas.nativeElement.toDataURL());

    console.log("hola putito");
  }
  //mostrar una notification
  openSnackBar(message) {
    this.snackBar.open(message, "", {
      duration: 3500,
    });
  }
}
