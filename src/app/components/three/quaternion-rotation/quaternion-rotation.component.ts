import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'app-quaternion-rotation',
    templateUrl: './quaternion-rotation.component.html',
    styleUrls: ['./quaternion-rotation.component.scss']
})
export class QuaternionRotationComponent implements OnInit, AfterViewInit {
    @ViewChild('rendererContainer', {static: true})
    rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;

    constructor() {
        this.scene = new THREE.Scene();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }
    animate(): void {
        window.requestAnimationFrame(() => this.animate());
    }

}
