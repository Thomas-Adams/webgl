import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeCanvasComponent } from './components/three/three-canvas/three-canvas.component';
import { QuaternionRotationComponent } from './components/three/quaternion-rotation/quaternion-rotation.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeCanvasComponent,
    QuaternionRotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
