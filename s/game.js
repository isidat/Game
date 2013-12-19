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
		BaseSheetSize: 40,
		MapSize: 15,
		CanvasWidth: 1800,
		CanvasHeight: 900,
		HomePadding: 8
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
			for (var x=0; x<Game.Config.MapSize; x++) {
			  for (var y=0; y<Game.Config.MapSize; y++) {
				var basesheet = new sheetengine.BaseSheet(
					{ x:x*Game.Config.BaseSheetSize, y:y*Game.Config.BaseSheetSize, z:0 },
					{ alphaD:90, betaD:0, gammaD:0 },
					{ w:Game.Config.BaseSheetSize, h:Game.Config.BaseSheetSize }
				);
				basesheet.color = Game.Helper.Color.PickRandomBaseSheetColor();
			  }
			}
		},
		DrawScene: function(full) {
			sheetengine.calc.calculateChangedSheets();
			sheetengine.drawing.drawScene(full);
		},
		DrawObjects: function() {
			Data.Buildings.forEach(function(building) {
				var southSheet = new sheetengine.Sheet(
					{ x:Game.Config.BaseSheetSize*building.x, y:Game.Config.BaseSheetSize*(building.y+0.5), z:building.height/2 },
					{ alphaD:0, betaD:0, gammaD:0 },
					{ w:Game.Config.BaseSheetSize, h:building.height }
				);
				southSheet.context.fillStyle = "#FF0";
				southSheet.context.fillRect(0, 0, Game.Config.BaseSheetSize, building.height);
				southSheet.context.fillStyle = "#588";
				southSheet.context.fillRect(Game.Config.HomePadding, Game.Config.HomePadding, Game.Config.BaseSheetSize-2*Game.Config.HomePadding, building.height-2*Game.Config.HomePadding);
				
				var westSheet = new sheetengine.Sheet(
					{ x:Game.Config.BaseSheetSize*(building.x-0.5), y:Game.Config.BaseSheetSize*(building.y), z:building.height/2 },
					{ alphaD:0, betaD:0, gammaD:90 },
					{ w:Game.Config.BaseSheetSize, h:building.height }
				);
				westSheet.context.fillStyle = "#FF0";
				westSheet.context.fillRect(0, 0, Game.Config.BaseSheetSize, building.height);
				
				var northSheet = new sheetengine.Sheet(
					{ x:Game.Config.BaseSheetSize*building.x, y:Game.Config.BaseSheetSize*(building.y-0.5), z:building.height/2 },
					{ alphaD:0, betaD:0, gammaD:0 },
					{ w:Game.Config.BaseSheetSize, h:building.height }
				);
				northSheet.context.fillStyle = "#FF0";
				northSheet.context.fillRect(0, 0, Game.Config.BaseSheetSize, building.height);
				
				var eastSheet = new sheetengine.Sheet(
					{ x:Game.Config.BaseSheetSize*(building.x+0.5), y:Game.Config.BaseSheetSize*(building.y), z:building.height/2 },
					{ alphaD:0, betaD:0, gammaD:90 },
					{ w:Game.Config.BaseSheetSize, h:building.height }
				);
				eastSheet.context.fillStyle = "#FF0";
				eastSheet.context.fillRect(0, 0, Game.Config.BaseSheetSize, building.height);
				eastSheet.context.fillStyle = "#844";
				eastSheet.context.fillRect(Game.Config.HomePadding, building.height-Game.Config.HomePadding, Game.Config.BaseSheetSize-2*Game.Config.HomePadding, Game.Config.HomePadding);
				
				var roofSheet = new sheetengine.Sheet(
					{ x:Game.Config.BaseSheetSize*(building.x), y:Game.Config.BaseSheetSize*(building.y), z:building.height },
					{ alphaD:90, betaD:0, gammaD:0 },
					{ w:Game.Config.BaseSheetSize, h:Game.Config.BaseSheetSize }
				);
				roofSheet.context.fillStyle = "#F00";
				roofSheet.context.fillRect(0, 0, Game.Config.BaseSheetSize, Game.Config.BaseSheetSize);
			});
			//var obj = new sheetengine.SheetObject({x:0,y:0,z:0}, {alphaD:0,betaD:0,gammaD:0}, [sheet1], {w:Game.Config.BaseSheetSize,h:Game.Config.BaseSheetSize});
		}
	}
};

Game.Start();