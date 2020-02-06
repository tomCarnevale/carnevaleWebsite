import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
// import fragment from './shaders/fragment.glsl';
// import vertex from './shaders/vertex.glsl';
import mountain from './img/mount.jpg';
import mountainMap from './img/mount-map.jpg';
import ball from './img/ball.jpg';
import ballMap from './img/ball-map.jpg';
import lady from './img/lady.jpg';
import ladyMap from './img/lady-map.jpg';
import canyon from './img/canyon.jpg';
import canyonMap from './img/canyon-map.jpg';
var vertex = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4( a_position, 0, 1 );
}`;

var fragment = `
#ifdef GL_ES
  precision mediump float;
#endif

uniform vec4 resolution;
uniform vec2 mouse;
uniform vec2 threshold;
uniform float time;
uniform float pixelRatio;
uniform sampler2D image0;
uniform sampler2D image1;


vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {
  // uvs and textures
  vec2 uv = pixelRatio*gl_FragCoord.xy/resolution.xy ;
  vec2 vUv = (uv - vec2(0.5))*resolution.zw + vec2(0.5);
  vUv.y = 1. - vUv.y;
  vec4 tex1 = texture2D(image1,mirrored(vUv));
  vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5)*mouse.x/threshold.x, vUv.y + (tex1.r - 0.5)*mouse.y/threshold.y);
  gl_FragColor = texture2D(image0,mirrored(fake3d));
}`;

const imageGroups = [
    [mountain, mountainMap,],
    [ball, ballMap,],
    [lady, ladyMap,],
    [canyon, canyonMap,]
]
export default class DioramaParallax extends React.Component {


    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.container = React.createRef();
       
        this.state = {
            index: props.index,
            height: props.height
        }
    }

    componentDidUpdate()
    {
        // this.resizeHandler();
    }

    componentDidMount() {
        // console.log(this.canvasRef.current);
        this.gl = this.canvasRef.current.getContext('webgl');

        this.ratio = window.devicePixelRatio;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.mouseX = 0;
        this.mouseY = 0;

        this.mouseTargetX = 0;
        this.mouseTargetY = 0;


        this.vth = '10';
        this.hth = '15';

        this.imageURLs = imageGroups[this.state.index];
        this.textures = [];

        // colors
        // #575757
        // #787878
        // #a7a7a7
        // #b7b7b7
        // #d6d6d6
        // #f7f7f7

        this.startTime = new Date().getTime(); // Get start time for animating
        this.createScene();
        this.addTexture();
        this.mouseMove();
    }

    addShader(source, type) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        let isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!isCompiled) {
            throw new Error('Shader compile error: ' + this.gl.getShaderInfoLog(shader));
        }
        this.gl.attachShader(this.program, shader);
    }


    createScene() {
        // create program
        this.program = this.gl.createProgram();
        // add shaders


        this.addShader(vertex, this.gl.VERTEX_SHADER);
        this.addShader(fragment, this.gl.FRAGMENT_SHADER);
        // link & use program
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        // create fragment uniforms
        this.uResolution = new Uniform('resolution', '4f', this.program, this.gl);
        this.uMouse = new Uniform('mouse', '2f', this.program, this.gl);
        this.uTime = new Uniform('time', '1f', this.program, this.gl);
        this.uRatio = new Uniform('pixelRatio', '1f', this.program, this.gl);
        this.uThreshold = new Uniform('threshold', '2f', this.program, this.gl);
        // create position attrib
        this.billboard = new Rect(this.gl);
        this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    addTexture() {
        let that = this;
        let gl = that.gl;
        loadImages(this.imageURLs, that.start.bind(this));
    }

    mouseMove() {
        let that = this;
        document.addEventListener('mousemove', function (e) {
            let halfX = that.windowWidth / 2;
            let halfY = that.windowHeight / 2;

            that.mouseTargetX = (halfX - e.clientX) / halfX;
            that.mouseTargetY = (halfY - e.clientY) / halfY;


        });
    }

    start(images) {
        let that = this;
        let gl = that.gl;

        // connect images
        this.imageAspect = images[0].naturalHeight / images[0].naturalWidth;
        for (var i = 0; i < images.length; i++) {


            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // Set the parameters so we can render any size image.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // Upload the image into the texture.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
            this.textures.push(texture);
        }

        // lookup the sampler locations.
        let u_image0Location = this.gl.getUniformLocation(this.program, 'image0');
        let u_image1Location = this.gl.getUniformLocation(this.program, 'image1');

        // set which texture units to render with.
        this.gl.uniform1i(u_image0Location, 0); // texture unit 0
        this.gl.uniform1i(u_image1Location, 1); // texture unit 1

        // Set each texture unit to use a particular texture.
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1]);


        // start application
        this.resize();
        this.renderParallax();
    }

    resizeHandler() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        if (this.container.current == undefined)
            return;

        this.width = this.container.current.offsetWidth;
        // this.height = this.width/this.aspect;
        this.height = this.container.current.offsetHeight;

        this.canvasRef.current.width = this.width; //* this.ratio;
        this.canvasRef.current.height = this.height; //* this.ratio;
        this.canvasRef.current.style.width = this.width + 'px';
        this.canvasRef.current.style.height = this.height + 'px';
        let a1, a2;
        if (this.height / this.width < this.imageAspect) {
            a1 = 1;
            a2 = (this.height / this.width) / this.imageAspect;
        } else {
            a1 = (this.width / this.height) * this.imageAspect;
            a2 = 1;
        }
        
        
        this.uResolution.set(this.width, this.height, a1, a2);
        this.uRatio.set(1);
        this.uThreshold.set(this.hth, this.vth);
        this.gl.viewport(0, 0, this.width, this.height);
    }

    resize() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler.bind(this));
    }

    renderParallax() {
        let now = new Date().getTime();
        let currentTime = (now - this.startTime) / 1000;
        this.uTime.set(currentTime);
        // inertia
        this.mouseX += (this.mouseTargetX - this.mouseX) * 0.35;
        this.mouseY += (this.mouseTargetY - this.mouseY) * 0.35;


        this.uMouse.set(-this.mouseX * .5, -this.mouseY * .5);

        // render
        this.billboard.renderStuff(this.gl);
        requestAnimationFrame(this.renderParallax.bind(this));
    }

    render() {
        return (
            <div ref={this.container}
                style={{ height: this.props.height }}
            >
                <div id="gl" >
                    <canvas ref={this.canvasRef}>
                    </canvas>
                </div>
            </div>
        )
    }
}

function loadImage(url, callback) {
    // console.log("start load image");
    var image = new Image();
    image.src = url;
    image.onload = callback;
    return image;
}
function loadImages(urls, callback) {
    var images = [];
    var imagesToLoad = urls.length;
    // console.log('loading images');
    // Called each time an image finished loading.
    var onImageLoad = function () {
        --imagesToLoad;
        // console.log('loaded an image');

        // If all the images are loaded call the callback.
        if (imagesToLoad === 0) {
            callback(images);
        }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) {
        var image = loadImage(urls[ii], onImageLoad);
        images.push(image);
    }
}
function Uniform(name, suffix, program, gl) {
    this.name = name;
    this.suffix = suffix;
    this.gl = gl;
    this.program = program;
    this.location = gl.getUniformLocation(program, name);
}

Uniform.prototype.set = function (...values) {
    let method = 'uniform' + this.suffix;
    let args = [this.location].concat(values);
    this.gl[method].apply(this.gl, args);
};

// ----- Rect ----- //
function Rect(gl) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, Rect.verts, gl.STATIC_DRAW);
}

Rect.verts = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1,
]);

Rect.prototype.renderStuff = function (gl) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
function clamp(number, lower, upper) {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
}

