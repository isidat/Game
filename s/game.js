var Game = {
	Start: function () {
        this.Helper.Import("Game.SheetEngine");
    },
	Helper: {
        Import: function (Class) {
            var klass = eval(Class);
            if (klass === undefined) {
                throw new Error(Class + " is undefined.");
            }
            if (klass["Init"] === undefined) {
                throw new Error(Class + " has no 'Init' method.");
            } else {
                klass["Init"]();
            }
        },
		Color: {
			BaseSheetColors: ["#5D7E36","#4D8E16","#6D6E26"],
			PickRandomBaseSheetColor: function() {
				return this.BaseSheetColors[parseInt(Math.random()*100%this.BaseSheetColors.length)];
			}
		}
    },
	Config: {
		BaseSheetSize: 50,
		MapSize: 10,
		CanvasWidth: 1800,
		CanvasHeight: 900
    },
	SheetEngine: {
		Init: function() {
			var canvasElement = document.getElementById('maincanvas');
			sheetengine.scene.init(canvasElement, { w:Game.Config.CanvasWidth, h:Game.Config.CanvasHeight });
			this.CreateBaseSheets();
			this.DrawObjects();			
			this.DrawScene(true);
		},
		CreateBaseSheets: function() {
			for (var x=0; x<=Game.Config.MapSize; x++) {
			  for (var y=0; y<=Game.Config.MapSize; y++) {
				var basesheet = new sheetengine.BaseSheet({ x:x*Game.Config.BaseSheetSize, y:y*Game.Config.BaseSheetSize, z:0 }, { alphaD:90, betaD:0, gammaD:0 }, { w:Game.Config.BaseSheetSize, h:Game.Config.BaseSheetSize });
				basesheet.color = Game.Helper.Color.PickRandomBaseSheetColor();
			  }
			}
		},
		DrawScene: function(full) {
			sheetengine.calc.calculateChangedSheets();
			sheetengine.drawing.drawScene(full);
		},
		DrawObjects: function() {
			var sheet1 = new sheetengine.Sheet({ x:0, y:Game.Config.BaseSheetSize/2, z:15 }, { alphaD:0, betaD:0, gammaD:0 }, { w:Game.Config.BaseSheetSize, h:30 });
			sheet1.context.fillStyle = "#F00";
			sheet1.context.fillRect(0, 0, Game.Config.BaseSheetSize, 30);
			sheet1.context.clearRect(10, 10, 30, 10);
			//var obj = new sheetengine.SheetObject({x:0,y:0,z:0}, {alphaD:0,betaD:0,gammaD:0}, [sheet1], {w:Game.Config.BaseSheetSize,h:Game.Config.BaseSheetSize});
		}
	}
};

Game.Start();