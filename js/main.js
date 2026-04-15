var juego = new Phaser.Game(1280,720,Phaser.CANVAS,'canvas');
var personaje,personaje_dos, velocidadMovimiento = 10, velocidadCarrera = 3;
var fondo, piso, pisoArbusto;

var pisoSuperior1,pisoSuperior2;

var boton,txtTitulo,txtMonedas,txtPause,botonPausa,botonSalir,botonRestart,pajaro,pajaro2;
var personajeVivo = true, personajeDosVivo = true;

var Monedas=0, Vidas=3, Puntos=0,Monedas_dos=0, Vidas_dos=3, Puntos_dos=0;
var PrimerEstado = {
    preload: function(){
        juego.load.image('fPE','IMG/fondoPrimerEstado.png');//se le llave key 
        juego.load.image('bola','IMG/bola.png')
        juego.load.image('bola','IMG/bola.png')
        juego.load.spritesheet('btn','IMG/botones.png',670,370);
        juego.load.audio('fondo_mario','audio/mario.mp3');
        juego.load.audio('click','audio/CLICK.mp3');
    },
    create: function(){
        juego.camera.x = 0;
        juego.camera.y = 0;
        juego.world.setBounds(0, 0, juego.width, juego.height);

        fondoEstado1 = juego.add.tileSprite(0,0,1280,720, 'fPE');
        fondoEstado1.width = juego.width;
        fondoEstado1.height = juego.height;
        audio_click = juego.add.audio('click');

        emitter=juego.add.emitter(540,1280,50);
        emitter.makeParticles('bola');
        emitter.area.width=2080;
        emitter.minParticleSpeed.setTo(10,-50);
        emitter.maxParticleSpeed.setTo(10,-100);
        emitter.minRotation=10;
        emitter.maxRotation=10;
        emitter.minParticleScale=0.03;
        emitter.maxParticleScale=0.1;
        emitter.gravity=-250;

        boton = juego.add.button(juego.world.centerX, juego.world.centerY, 'btn', Myfuncion, this, 0);
        boton.anchor.set(0.5);
        boton.scale.setTo(0.4);
        

        audio_fondo=juego.add.audio('fondo_mario');
        audio_fondo.addMarker('intro',0,14,1,true);//marcador
        audio_fondo.play('intro');
        
        //El primer es como la vida en milisegundos, el segundo es el lapso de tiempo para arrojar mas particulas, el tercero es la cantidad de gotas, el 4 es como para que quede en un bucle y se ejecute siempre o limitarlo como 5 y se repetira 5 veces
        emitter.flow(4000,800,10,-1); 

        txtTitulo = juego.add.text(juego.world.centerX, boton.y - 250, "LOS CHAVALES DE POLO", {
            font: "bold 64px Arial",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6,
            align: "center"
        });

        // centrar el texto correctamente
        txtTitulo.anchor.set(0.5);

        // sombra para que se vea más pro
        txtTitulo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        juego.add.tween(txtTitulo).to({ y: txtTitulo.y - 10 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

        
        emitter=juego.add.emitter(540,1280,50);
        emitter.makeParticles('bola');
        emitter.area.width=2080;
        emitter.minParticleSpeed.setTo(10,-50);
        emitter.maxParticleSpeed.setTo(100,-100);
        emitter.minRotation=5;
        emitter.maxRotation=15;
        emitter.minParticleScale=0.02;
        emitter.maxParticleScale=0.08;
        emitter.gravity=-250;
        //El primer es como la vida en milisegundos, el segundo es el lapso de tiempo para arrojar mas particulas, el tercero es la cantidad de gotas, el 4 es como para que quede en un bucle y se ejecute siempre o limitarlo como 5 y se repetira 5 veces
        emitter.flow(4000,800,10,-1); 

        function Myfuncion(){
            audio_click.play()
            juego.state.add('EstadoDos',SegundoEstado);
            juego.state.start('EstadoDos');
            audio_fondo.stop('audio_mario');
        }
    },
    update: function(){
        fondoEstado1.tilePosition.x -= 5;
    }
};
var SegundoEstado = {
    preload: function(){
        juego.load.image('fondo', 'img/fondo.png')
        juego.load.spritesheet('personaje', 'img/monito_rojo.png', 108, 140)
        juego.load.spritesheet('personaje_dos', 'img/monito_verde.png', 108, 140)

        juego.load.image('pisoArbusto', 'img/pisoJuego.png')
        juego.load.image('piso', 'img/piso.png')

        juego.load.image('castillo', 'img/castillo.png')
        juego.load.image('bola', 'img/bola.png')

        juego.load.image('vida', 'img/corazon.png')
        

        juego.load.spritesheet('murcielago', 'img/murcielago.png', 165, 151, 4, 0, 0)
        juego.load.spritesheet('murcielagoiz', 'img/murcielago_iz.png', 165, 151, 4, 0, 0)

        juego.load.spritesheet('pajaro_blanco', 'img/pajarito.png', 16 ,16);
        juego.load.spritesheet('pajaro_azul', 'img/pajaro2.png', 16 ,16);
        
        // juego.load.spritesheet('moneda', 'img/moneda.png', 474, 762, 7);
        juego.load.image('moneda', 'img/monedaa.png')
        juego.load.audio('audio_moneda','audio/moneda.mp3');

        juego.load.image('monstruo', 'img/monstruo.png')

        juego.load.image('btnP','IMG/pausa.png',370,400);
        juego.load.audio('click','audio/CLICK.mp3');
        juego.load.image('btnS','IMG/sali.png',700,240);
        juego.load.image('btnR','IMG/reiniciar.png',300,150);

        juego.load.audio('audio_fondo','audio/Velocity_Override.mp3');

        juego.load.audio('audioComida','audio/comida.mp3');
        juego.load.audio('daño','audio/daño.mp3');




    },
    create: function(){
        fondo = juego.add.tileSprite(0,0,3000,720, 'fondo');

        audio_fondo = juego.add.audio('audio_fondo');
        audio_fondo.addMarker('intro', 1, 225, 1, true);
        audio_fondo.play('intro');

        botonPausa = juego.add.button(90, 60, 'btnP', FuncionPausa, this);
        botonPausa.anchor.set(0.5);
        botonPausa.scale.setTo(0.2);
        botonPausa.fixedToCamera=true;
        audio_click = juego.add.audio('click');
        audio_daño = juego.add.audio('daño');

        function FuncionPausa() {
            audio_click.play();
            if (!juego.paused) {
                juego.paused = true;
                botonSalir.visible = false;
                txtPause = juego.add.text(0, 0, "PAUSA", {
                    font: "bold 50px Arial",
                    fill: "#ec1515",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                txtPause.setTextBounds(590, 310, 100, 100);
                juego.input.onDown.add(quitarPausa, this);
            }
        }
        function quitarPausa() {
            audio_click.play();
            if (juego.paused) {
                juego.paused = false;
                botonSalir.visible = true;
                if (txtPause) {
                    txtPause.destroy();
                }
                juego.input.onDown.remove(quitarPausa, this);
            }
        }

        botonRestart = juego.add.button(270, 60, 'btnR', restart, this);
        botonRestart.anchor.set(0.5);
        botonRestart.scale.setTo(0.4);
        botonRestart.fixedToCamera=true;
        function restart(){
            audio_click.play();
            juego.state.restart();
            audio_fondo.stop('intro');
            Vidas=3;
            Monedas=0;
            Puntos=0;
            Vidas_dos=3;
            Monedas_dos=0;
            Puntos_dos=0;
            personajeVivo = true;
            personajeDosVivo = true;
        }

        botonSalir = juego.add.button(1190, 60, 'btnS', salirJuego, this);
        botonSalir.anchor.set(0.5);
        botonSalir.scale.setTo(0.2);
        botonSalir.fixedToCamera=true;
        function salirJuego(){
            audio_click.play();
            juego.state.start('EstadoUno',true,false);
            audio_fondo.stop('intro');
            personajeVivo = true;
            personajeDosVivo = true;
        }

        audio_moneda = juego.add.audio('moneda');

        //pajaros
        pajaro = juego.add.sprite(3000, 100, 'pajaro_blanco');
        pajaro.animations.add('volar', [0,1,2,3,4,5,6,7], 10, true);
        pajaro.animations.play('volar');
        pajaro.scale.setTo(2);

        pajaro2 = juego.add.sprite(3000, 600, 'pajaro_azul');
        pajaro2.animations.add('volar', [0,1,2,3], 10, true);
        pajaro2.animations.play('volar');
        pajaro2.scale.setTo(2);
        
        castillo = juego.add.sprite(2800,470,'castillo');
        castillo.scale.setTo(0.6);
        plataformas = juego.add.group();
        plataformas.enableBody = true;
        
        function crearPlataforma(x, y, ancho, alto){
            let p = plataformas.create(x, y, 'piso');
            p.width = ancho;
            p.height = alto;
            p.body.immovable = true;
            return p;
        }
        
        //P1
        crearPlataforma(0,670,300,50);
        //P2
        crearPlataforma(400,520,200,30)
        //P3
        crearPlataforma(0,340,300,50)
        moneda1 = juego.add.sprite(150,250, 'moneda');
        moneda1.scale.setTo(0.08);
        juego.physics.enable(moneda1)
        //P4
        crearPlataforma(700,690,200,50)
        vida1 = juego.add.sprite(800,640, 'vida');
        vida1.scale.setTo(0.08);
        juego.physics.enable(vida1)

        moneda3 = juego.add.sprite(800,300, 'moneda');
        moneda3.scale.setTo(0.08);
        juego.physics.enable(moneda3)

        //P5
        crearPlataforma(400,160,400,50)
        //P6
        crearPlataforma(1000,340,300,50)
        vida2 = juego.add.sprite(1100,290, 'vida');
        vida2.scale.setTo(0.08);
        juego.physics.enable(vida2)
        //P7
        crearPlataforma(1400,540,400,30)
        moneda2 = juego.add.sprite(1470,490, 'moneda');
        moneda2.scale.setTo(0.08);
        juego.physics.enable(moneda2)
        //P8
        crearPlataforma(2000,670,300,50)
        //P9
        crearPlataforma(2400,540,300,30)
        //P10
        crearPlataforma(2000,360,300,50)
        vida3 = juego.add.sprite(2100,310, 'vida');
        vida3.scale.setTo(0.08);
        juego.physics.enable(vida3)
        //P11
        crearPlataforma(2400,170,200,50)
        moneda4 = juego.add.sprite(2500,120, 'moneda');
        moneda4.scale.setTo(0.08);
        juego.physics.enable(moneda4)
        //Pcastillo
        crearPlataforma(2800,670,300,50)

        audioComida=juego.add.audio('audioComida');
        audioMoneda=juego.add.audio('audio_moneda');
        
        txtVidas = juego.add.text(0,-20, "Vidas: " + Vidas + "♥️", {
            font: "bold 32px Arial",
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtVidas.setTextBounds(590, 5, 100, 100);
        txtVidas.fixedToCamera=true;

        txtMonedas = juego.add.text(0,20, "Monedas: " + Monedas + "🪙", {
            font: "bold 32px Arial",
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtMonedas.setTextBounds(590, 5, 100, 100);
        txtMonedas.fixedToCamera=true;

        txtPuntos = juego.add.text(0,60, "Puntos: " + Puntos + "🎰", {
            font: "bold 32px Arial",
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtPuntos.setTextBounds(590, 5, 100, 100);
        txtPuntos.fixedToCamera=true;

        // TEXTOS PERSONAJE 2 (lado derecho de la pantalla)
        txtVidas_dos = juego.add.text(0, -20, "P2 Vidas: " + Vidas_dos + "💚", {
            font: "bold 28px Arial",
            fill: "#00ff88",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtVidas_dos.setTextBounds(900, 5, 100, 100);
        txtVidas_dos.fixedToCamera = true;

        txtMonedas_dos = juego.add.text(0, 20, "P2 Monedas: " + Monedas_dos + "🪙", {
            font: "bold 28px Arial",
            fill: "#00ff88",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtMonedas_dos.setTextBounds(900, 5, 100, 100);
        txtMonedas_dos.fixedToCamera = true;

        txtPuntos_dos = juego.add.text(0, 60, "P2 Puntos: " + Puntos_dos + "🎰", {
            font: "bold 28px Arial",
            fill: "#00ff88",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txtPuntos_dos.setTextBounds(900, 5, 100, 100);
        txtPuntos_dos.fixedToCamera = true;
        
        
        //PERSONAJE
        personaje = juego.add.sprite(0,555,'personaje');
        personaje.scale.setTo(0.7);

        juego.physics.enable(personaje);
        personaje.body.gravity.y = 400;
        personaje.body.setSize(60, 90, 20, 25);

        personaje.animations.add('derecha',[0,1,2,3],velocidadMovimiento,true);
        personaje.animations.add('izquierda',[8,9,10,11],velocidadMovimiento,true);

        //PERSONAJE 2
        personaje_dos = juego.add.sprite(100,555,'personaje_dos');
        personaje_dos.scale.setTo(0.7);

        juego.physics.enable(personaje_dos);
        personaje_dos.body.gravity.y = 400;
        personaje_dos.body.setSize(60, 90, 20, 25);

        personaje_dos.animations.add('derecha_dos',[0,1,2,3],velocidadMovimiento,true);
        personaje_dos.animations.add('izquierda_dos',[8,9,10,11],velocidadMovimiento,true);

        //MURCIELGOS
        murcielago = juego.add.sprite(0,400,'murcielago');
        murcielago.animations.add('movimiento',[0,1,2,3], 10, true);
        murcielago.play('movimiento');
        juego.physics.enable(murcielago)

        murcielagoIz = juego.add.sprite(3000,200,'murcielagoiz');
        murcielagoIz.animations.add('movimiento',[0,1,2,3], 10, true);
        murcielagoIz.play('movimiento');
        juego.physics.enable(murcielagoIz)

        //P7
        // crearPlataforma(1400,540,400,30)
        monstruo1 = juego.add.sprite(2200,520, 'monstruo');
        juego.physics.enable(monstruo1)

        monstruo2 = juego.add.sprite(400,0, 'monstruo');
        juego.physics.enable(monstruo2)
        
        //ATAQUE
        arma = juego.add.weapon(100, 'bola');
        arma.bulletKillType = Phaser.Weapon.Kill_WORLD_BOUNDS;
        arma.bulletSpeed = 900;
        arma.fireRate = 50;
        arma.trackSprite (personaje,32.5,32.5,false);
        arma.bullets.setAll('scale.x',0.03)
        arma.bullets.setAll('scale.y',0.03)
        
        arma2 = juego.add.weapon(100, 'bola');
        arma2.bulletKillType = Phaser.Weapon.Kill_WORLD_BOUNDS;
        arma2.bulletSpeed = 900;
        arma2.fireRate = 50;
        arma2.trackSprite (personaje_dos,32.5,32.5,false);
        arma2.bullets.setAll('scale.x',0.03)
        arma2.bullets.setAll('scale.y',0.03)
       

        // CONTROLES
        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.D);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.A);
        teclaSpace = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        teclaDisparar = juego.input.keyboard.addKey(Phaser.Keyboard.F);

        teclaDerecha_dos = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda_dos = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaSpace_dos = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        teclaDisparar_dos = juego.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        this.matarMounstruo = function(bala, enemigo, jugador) {
            bala.kill();
            enemigo.destroy();
            if (jugador === 1) {
                Puntos += 100;
                txtPuntos.setText('Puntos: ' + Puntos + '🎰');
            } else {
                Puntos_dos += 100;
                txtPuntos_dos.setText('P2 Puntos: ' + Puntos_dos + '🎰');
            }
        }

        this.matarJefe = function(bala, enemigo, jugador) {
            bala.kill();
            enemigo.destroy();
            if (jugador === 1) {
                Puntos += 500;
                txtPuntos.setText('Puntos: ' + Puntos + '🎰');
            } else {
                Puntos_dos += 500;
                txtPuntos_dos.setText('P2 Puntos: ' + Puntos_dos + '🎰');
            }
        }
        

        // CÁMARA
        juego.world.setBounds(0,0,3000,720);
        juego.camera.follow(personaje);
    },
    update: function(){
        fondo.tilePosition.x -= 3;

        // seguimiento de cámara compartida
        if (personajeVivo && personajeDosVivo) {
            if (personaje.x >= personaje_dos.x) {
                juego.camera.follow(personaje);
            } else {
                juego.camera.follow(personaje_dos);
            }
        } else if (personajeVivo) {
            juego.camera.follow(personaje);
        } else if (personajeDosVivo) {
            juego.camera.follow(personaje_dos);
        }

        // ─────────────────────────────────────────
        // DAÑO Y ACCIONES DE PERSONAJE 1
        // ─────────────────────────────────────────
        if(personajeVivo){

            // Daño de enemigos a P1
            if(murcielago && murcielago.body && juego.physics.arcade.overlap(personaje, murcielago)){
                Vidas -= 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                murcielago.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje.tint === 0xffffff){ personaje.tint = 0xff0000; }
                    else{ personaje.tint = 0xffffff; }
                }, this);
            }
            if(murcielagoIz && murcielagoIz.body && juego.physics.arcade.overlap(personaje, murcielagoIz)){
                Vidas -= 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                murcielagoIz.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje.tint === 0xffffff){ personaje.tint = 0xff0000; }
                    else{ personaje.tint = 0xffffff; }
                }, this);
            }
            if(monstruo1 && monstruo1.body && juego.physics.arcade.overlap(personaje, monstruo1)){
                Vidas -= 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                monstruo1.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje.tint === 0xffffff){ personaje.tint = 0xff0000; }
                    else{ personaje.tint = 0xffffff; }
                }, this);
            }
            if(monstruo2 && monstruo2.body && juego.physics.arcade.overlap(personaje, monstruo2)){
                Vidas -= 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                monstruo2.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje.tint === 0xffffff){ personaje.tint = 0xff0000; }
                    else{ personaje.tint = 0xffffff; }
                }, this);
            }

            // Recoger Vidas P1
            if(vida1 && vida1.body && juego.physics.arcade.overlap(personaje, vida1)){
                vida1.destroy(); Vidas += 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                audioComida.play();
            }
            if(vida2 && vida2.body && juego.physics.arcade.overlap(personaje, vida2)){
                vida2.destroy(); Vidas += 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                audioComida.play();
            }
            if(vida3 && vida3.body && juego.physics.arcade.overlap(personaje, vida3)){
                vida3.destroy(); Vidas += 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                audioComida.play();
            }

            // Recoger Monedas P1
            if(moneda1 && moneda1.body && juego.physics.arcade.overlap(personaje, moneda1)){
                moneda1.destroy(); Monedas += 100;
                txtMonedas.setText('Monedas: '+ Monedas + "🪙");
                audioMoneda.play();
            }
            if(moneda2 && moneda2.body && juego.physics.arcade.overlap(personaje, moneda2)){
                moneda2.destroy(); Monedas += 100;
                txtMonedas.setText('Monedas: '+ Monedas + "🪙");
                audioMoneda.play();
            }
            if(moneda3 && moneda3.body && juego.physics.arcade.overlap(personaje, moneda3)){
                moneda3.destroy(); Monedas += 100;
                txtMonedas.setText('Monedas: '+ Monedas + "🪙");
                audioMoneda.play();
            }
            if(moneda4 && moneda4.body && juego.physics.arcade.overlap(personaje, moneda4)){
                moneda4.destroy(); Monedas += 100;
                txtMonedas.setText('Monedas: '+ Monedas + "🪙");
                audioMoneda.play();
            }

            // Colision y movimiento P1
            juego.physics.arcade.collide(personaje, plataformas);
            personaje.body.velocity.x = 0;

            if(teclaDerecha.isDown){
                personaje.body.velocity.x = velocidadCarrera * 50;
                personaje.animations.play('derecha');
                arma.fireAngle = 0;
            } else if(teclaIzquierda.isDown){
                personaje.body.velocity.x = -velocidadCarrera * 50;
                personaje.animations.play('izquierda');
                arma.fireAngle = 180;
            } else {
                personaje.animations.stop();
            }

            if(teclaSpace.isDown && personaje.body.touching.down){
                personaje.body.velocity.y = -400;
            }
            if(teclaDisparar.isDown){
                arma.fire();
            }

            // Si se cae P1
            if(personaje.y > 720){
                Vidas -= 1;
                txtVidas.setText('Vidas: '+ Vidas + "❤️");
                if(Vidas > 0){
                    personaje.x = 0;
                    personaje.y = 500;
                }
            }

            // Verificar si P1 se quedó sin vidas
            if(Vidas <= 0 && personajeVivo){
                personajeVivo = false;
                personaje.destroy();
                txtVidas.setText('P1: MUERTO 💀');
            }
        }

        // ─────────────────────────────────────────
        // DAÑO Y ACCIONES DE PERSONAJE 2
        // ─────────────────────────────────────────
        if(personajeDosVivo){

            // Daño de enemigos a P2
            if(murcielago && murcielago.body && juego.physics.arcade.overlap(personaje_dos, murcielago)){
                Vidas_dos -= 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                murcielago.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje_dos.tint === 0xffffff){ personaje_dos.tint = 0x00ff00; }
                    else{ personaje_dos.tint = 0xffffff; }
                }, this);
            }
            if(murcielagoIz && murcielagoIz.body && juego.physics.arcade.overlap(personaje_dos, murcielagoIz)){
                Vidas_dos -= 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                murcielagoIz.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje_dos.tint === 0xffffff){ personaje_dos.tint = 0x00ff00; }
                    else{ personaje_dos.tint = 0xffffff; }
                }, this);
            }
            if(monstruo1 && monstruo1.body && juego.physics.arcade.overlap(personaje_dos, monstruo1)){
                Vidas_dos -= 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                monstruo1.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje_dos.tint === 0xffffff){ personaje_dos.tint = 0x00ff00; }
                    else{ personaje_dos.tint = 0xffffff; }
                }, this);
            }
            if(monstruo2 && monstruo2.body && juego.physics.arcade.overlap(personaje_dos, monstruo2)){
                Vidas_dos -= 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                monstruo2.destroy();
                audio_daño.play();
                juego.camera.shake(0.05, 500);
                juego.camera.flash(0xffffff, 250);
                juego.time.events.repeat(300, 6, function(){
                    if(personaje_dos.tint === 0xffffff){ personaje_dos.tint = 0x00ff00; }
                    else{ personaje_dos.tint = 0xffffff; }
                }, this);
            }

            // Recoger Vidas P2
            if(vida1 && vida1.body && juego.physics.arcade.overlap(personaje_dos, vida1)){
                vida1.destroy(); Vidas_dos += 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                audioComida.play();
            }
            if(vida2 && vida2.body && juego.physics.arcade.overlap(personaje_dos, vida2)){
                vida2.destroy(); Vidas_dos += 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                audioComida.play();
            }
            if(vida3 && vida3.body && juego.physics.arcade.overlap(personaje_dos, vida3)){
                vida3.destroy(); Vidas_dos += 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                audioComida.play();
            }

            // Recoger Monedas P2
            if(moneda1 && moneda1.body && juego.physics.arcade.overlap(personaje_dos, moneda1)){
                moneda1.destroy(); Monedas_dos += 100;
                txtMonedas_dos.setText('P2 Monedas: '+ Monedas_dos + "🪙");
                audioMoneda.play();
            }
            if(moneda2 && moneda2.body && juego.physics.arcade.overlap(personaje_dos, moneda2)){
                moneda2.destroy(); Monedas_dos += 100;
                txtMonedas_dos.setText('P2 Monedas: '+ Monedas_dos + "🪙");
                audioMoneda.play();
            }
            if(moneda3 && moneda3.body && juego.physics.arcade.overlap(personaje_dos, moneda3)){
                moneda3.destroy(); Monedas_dos += 100;
                txtMonedas_dos.setText('P2 Monedas: '+ Monedas_dos + "🪙");
                audioMoneda.play();
            }
            if(moneda4 && moneda4.body && juego.physics.arcade.overlap(personaje_dos, moneda4)){
                moneda4.destroy(); Monedas_dos += 100;
                txtMonedas_dos.setText('P2 Monedas: '+ Monedas_dos + "🪙");
                audioMoneda.play();
            }

            // Colision y movimiento P2
            juego.physics.arcade.collide(personaje_dos, plataformas);
            personaje_dos.body.velocity.x = 0;

            if(teclaDerecha_dos.isDown){
                personaje_dos.body.velocity.x = velocidadCarrera * 50;
                personaje_dos.animations.play('derecha_dos');
                arma2.fireAngle = 0;
            } else if(teclaIzquierda_dos.isDown){
                personaje_dos.body.velocity.x = -velocidadCarrera * 50;
                personaje_dos.animations.play('izquierda_dos');
                arma2.fireAngle = 180;
            } else {
                personaje_dos.animations.stop();
            }

            if(teclaSpace_dos.isDown && personaje_dos.body.touching.down){
                personaje_dos.body.velocity.y = -400;
            }
            if(teclaDisparar_dos.isDown){
                arma2.fire();
            }

            // Si se cae P2
            if(personaje_dos.y > 720){
                Vidas_dos -= 1;
                txtVidas_dos.setText('P2 Vidas: '+ Vidas_dos + "💚");
                if(Vidas_dos > 0){
                    personaje_dos.x = 100;
                    personaje_dos.y = 500;
                }
            }

            // Verificar si P2 se quedó sin vidas
            if(Vidas_dos <= 0 && personajeDosVivo){
                personajeDosVivo = false;
                personaje_dos.destroy();
                txtVidas_dos.setText('P2: MUERTO 💀');
            }
        }

        // ─────────────────────────────────────────
        // BALAS VS ENEMIGOS (ambas armas)
        // ─────────────────────────────────────────
        // En update — reemplaza el bloque "BALAS VS ENEMIGOS"
        if (murcielago && murcielago.body) {
            if (personajeVivo)    juego.physics.arcade.overlap(arma.bullets,  murcielago, function(b,e){ this.matarMounstruo(b,e,1); }, null, this);
            if (personajeDosVivo) juego.physics.arcade.overlap(arma2.bullets, murcielago, function(b,e){ this.matarMounstruo(b,e,2); }, null, this);
        }
        if (murcielagoIz && murcielagoIz.body) {
            if (personajeVivo)    juego.physics.arcade.overlap(arma.bullets,  murcielagoIz, function(b,e){ this.matarMounstruo(b,e,1); }, null, this);
            if (personajeDosVivo) juego.physics.arcade.overlap(arma2.bullets, murcielagoIz, function(b,e){ this.matarMounstruo(b,e,2); }, null, this);
        }
        if (monstruo1 && monstruo1.body) {
            if (personajeVivo)    juego.physics.arcade.overlap(arma.bullets,  monstruo1, function(b,e){ this.matarJefe(b,e,1); }, null, this);
            if (personajeDosVivo) juego.physics.arcade.overlap(arma2.bullets, monstruo1, function(b,e){ this.matarJefe(b,e,2); }, null, this);
        }
        if (monstruo2 && monstruo2.body) {
            if (personajeVivo)    juego.physics.arcade.overlap(arma.bullets,  monstruo2, function(b,e){ this.matarJefe(b,e,1); }, null, this);
            if (personajeDosVivo) juego.physics.arcade.overlap(arma2.bullets, monstruo2, function(b,e){ this.matarJefe(b,e,2); }, null, this);
        }

        // ─────────────────────────────────────────
        // MOVIMIENTO DE ENEMIGOS Y PAJAROS
        // ─────────────────────────────────────────
        if(murcielago && murcielago.body){
            murcielago.position.x += 5;
            if(murcielago.position.x > 3000) murcielago.position.x = -100;
        }
        if(murcielagoIz && murcielagoIz.body){
            murcielagoIz.position.x -= 5;
            if(murcielagoIz.position.x < 0) murcielagoIz.position.x = 3100;
        }

        pajaro.position.x -= 8;
        if(pajaro.position.x < 0) pajaro.position.x = 3100;

        pajaro2.position.x -= 4;
        if(pajaro2.position.x < 0) pajaro2.position.x = 3100;

        // ─────────────────────────────────────────
        // GAME OVER: solo cuando los dos están muertos
        // ─────────────────────────────────────────
        if(!personajeVivo && !personajeDosVivo){
            audio_fondo.stop();
            juego.state.add('edotres', TercerEstado);
            juego.state.start('edotres');
        }
    }
};
var TercerEstado={
    preload: function(){
        juego.load.image('fondo','IMG/gameover.png');//se le llave key 
        juego.load.audio('roluki','AUDIO/gameover.mp3'); 
    },
    create: function(){
        juego.camera.x = 0;
        juego.camera.y = 0;
         Vidas = 3;
         Monedas = 0;
         Puntos = 0;
         Vidas_dos = 3;
         Monedas_dos = 0;
         Puntos_dos = 0;
        fondo = juego.add.sprite(0, 0, 'fondo');
        fondo.width = juego.width;
        fondo.height = juego.height;
        enter = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        MENSAJE = juego.add.text(0, 0, "PRESIONA ENTER PARA PODER REINICIAR EL JUEGO",{
            font: "bold 32px Arial",
            fill: "#c81212",
            boundsAlignH: "center",
            boundsAlignV: "middle"
           
        });
        MENSAJE.setTextBounds(630, 340, 100, 100);
        audio_fondo = juego.add.audio('roluki');
        audio_fondo.addMarker('intro', 0, 3, 1, true);
        audio_fondo.play('intro');
    },
    update: function(){
        if (enter.isDown) { 
            juego.state.start('EstadoUno');
            audio_fondo.stop('intro');
            personajeVivo = true;
            personajeDosVivo = true;
        }
    }
}
juego.state.add('EstadoUno', PrimerEstado);
juego.state.add('EstadoDos',SegundoEstado);
// juego.state.add('EstadoTres',TercerEstadoEstado);
juego.state.start('EstadoUno');