import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import * as datGui from 'dat.gui';
import {ThreePosition} from '../../../models/three/helper/three-position';


@Component({
    selector: 'app-three-canvas',
    templateUrl: './three-canvas.component.html',
    styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements OnInit, AfterViewInit {
    @ViewChild('rendererContainer', {static: true})
    rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;
    axes = new THREE.AxesHelper(20);
    plane = null;

    fov = 45.0;
    aspectRatio: number;
    near = 1;
    far = 10000;
    cameraZ = 1000;
    clearColor = new THREE.Color(0xEEEEEE);
    boxColor: any;
    wireframe = true;
    showAxisHelper: boolean;
    cameraPosition: ThreePosition;
    lightPosition: ThreePosition;
    planeRotation: ThreePosition;
    planePosition: ThreePosition;
    cubePosition: ThreePosition;
    gui: datGui.GUI;
    controls = {clearColor: 0xEEEEEE, cubeColor: 0xFF0000, lightColor: 0xffffff, planeColor: 0xcccccc};
    cube = {x: 1.0, y: 1.0, z: 1.0};
    spotLight: THREE.SpotLight;


    constructor() {
        this.scene = new THREE.Scene();
        this.aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, this.near, this.far);
        this.cameraPosition = {x: -30, y: -10, z: 100};
        this.lightPosition = {x: -30, y: -10, z: 100};
        this.planeRotation = {x: 0.5 * Math.PI, y: 0, z: 0};
        this.planePosition = {x: 0, y: 0, z: 0};
        this.cubePosition = {x: 0, y: 0, z: 0};
        this.camera.position.x = this.cameraPosition.x;
        this.camera.position.y = this.cameraPosition.y;
        this.camera.position.z = this.cameraPosition.z;
        this.spotLight = new THREE.SpotLight(this.controls.lightColor);
        this.showAxisHelper = true;

        const geometry = new THREE.BoxGeometry(14, 14, 14);
        const material = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);
        const planeGeometry = new THREE.PlaneGeometry(40, 40);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc, wireframe: false, side: THREE.DoubleSide});
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = this.planeRotation.x;
        this.plane.castShadow = true;
        this.mesh.castShadow = true;
        this.plane.receiveShadow = true;
        this.spotLight.castShadow = true;

        this.scene.add(this.mesh);
        this.scene.add(this.plane);
        this.scene.add(this.spotLight);

        this.gui = new datGui.GUI();
        const obj = this;
        this.gui.add(obj, 'far');
        this.gui.add(obj, 'fov', 0.0, 360.0);
        this.gui.add(obj, 'wireframe');
        this.gui.add(obj, 'showAxisHelper');
        const colorGroup = this.gui.addFolder('Color');
        colorGroup.addColor(obj.controls, 'cubeColor');
        colorGroup.addColor(obj.controls, 'lightColor');
        colorGroup.addColor(obj.controls, 'planeColor');

        const planeRotationGroup = this.gui.addFolder('Plane rotation');
        planeRotationGroup.add(obj.planeRotation, 'x', -2 * Math.PI, 2 * Math.PI);
        planeRotationGroup.add(obj.planeRotation, 'y', -2 * Math.PI, 2 * Math.PI);
        planeRotationGroup.add(obj.planeRotation, 'z', -2 * Math.PI, 2 * Math.PI);

        const planePositionGroup = this.gui.addFolder('Plane position');
        planePositionGroup.add(obj.planePosition, 'x', -100, 100);
        planePositionGroup.add(obj.planePosition, 'y', -100, 100);
        planePositionGroup.add(obj.planePosition, 'z', -100, 100);


        const cubePositionGroup = this.gui.addFolder('Cube position');
        cubePositionGroup.add(obj.cubePosition, 'x', -100, 100);
        cubePositionGroup.add(obj.cubePosition, 'y', -100, 100);
        cubePositionGroup.add(obj.cubePosition, 'z', -100, 100);

        const cubeScaleGroup = this.gui.addFolder('Cube scaling');
        cubeScaleGroup.add(obj.cube, 'x', 0, 100.0);
        cubeScaleGroup.add(obj.cube, 'y', 0, 100.0);
        cubeScaleGroup.add(obj.cube, 'z', 0, 100.0);
        const cameraPosition = this.gui.addFolder('Camera position');
        cameraPosition.add(obj.camera.position, 'x', -100, 100.0).step(1);
        cameraPosition.add(obj.camera.position, 'y', -100, 100.0).step(1);
        cameraPosition.add(obj.camera.position, 'z', -100, 100.0).step(1);
        const lightPosition = this.gui.addFolder('Light position');
        lightPosition.add(obj.lightPosition, 'x', -100, 100.0).step(1);
        lightPosition.add(obj.lightPosition, 'y', -100, 100.0).step(1);
        lightPosition.add(obj.lightPosition, 'z', -100, 100.0).step(1);

    }

    ngAfterViewInit(): void {
        this.renderer.setClearColor(this.clearColor);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }

    animate(): void {
        window.requestAnimationFrame(() => this.animate());
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.mesh.position.x = this.cubePosition.x;
        this.mesh.position.y = this.cubePosition.y;
        this.mesh.position.z = this.cubePosition.z;
        this.camera.far = this.far;
        this.camera.fov = this.fov;
        this.camera.updateProjectionMatrix();
        this.mesh.material.wireframe = this.wireframe;
        this.mesh.material.color.setHex(this.controls.cubeColor);
        this.plane.material.color.setHex(this.controls.planeColor);
        this.spotLight.color.setHex(this.controls.lightColor);
        this.mesh.scale.x = this.cube.x;
        this.mesh.scale.y = this.cube.y;
        this.mesh.scale.z = this.cube.z;
        this.plane.rotation.x = this.planeRotation.x;
        this.plane.rotation.y = this.planeRotation.y;
        this.plane.rotation.z = this.planeRotation.z;

        this.plane.position.x = this.planePosition.x;
        this.plane.position.y = this.planePosition.y;
        this.plane.position.z = this.planePosition.z;

        this.spotLight.position.setX(this.lightPosition.x);
        this.spotLight.position.setY(this.lightPosition.y);
        this.spotLight.position.setZ(this.lightPosition.z);
        if (this.showAxisHelper) {
            this.scene.add(this.axes);
        } else {
            this.scene.remove(this.axes);
        }

        this.renderer.render(this.scene, this.camera);
    }

    ngOnInit(): void {
    }

}
