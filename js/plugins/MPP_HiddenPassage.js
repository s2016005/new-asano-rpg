//=============================================================================
// MPP_HiddenPassage.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.2.1】指定したリージョンIDのタイルをプレイヤーより上に表示させます。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   SetPlayerZ z           # プレイヤーの高さ設定
 * 
 * ================================================================
 * ▼ プラグインコマンド 詳細
 * --------------------------------
 *  〇 SetPlayerZ z
 *       z : プレイヤーのZ座標
 * 
 *   プレイヤーのZ座標を設定します。
 *   この数値以下のリージョンはプレイヤーより下に表示されます。
 *   
 *   実際にはキャラクターのZ座標を変更しているのではなく、
 *   キャラクターより上に表示させるかどうかの判定方法を変えているだけです。
 *   キャラクターごとのZ座標は指定できません。
 * 
 * ================================================================
 * ▼ プラグインパラメータ 詳細
 * --------------------------------
 *  〇 Passable Upper Region Ids (上に表示し通行可能なリージョンIDの配列) /
 *     Impassable Upper Region Ids (上に表示し通行できないリージョンIDの配列)
 *  
 *   設定したリージョンIDで、かつプレイヤーのZ座標より高いタイルは、
 *   キャラクターより上に表示されます。
 *   
 *   キャラクターより下に表示された場合は通常の通行判定となります。
 *  
 *   リージョンIDの設定には範囲指定が可能です。
 *   数値を配列で設定する際、n-m と表記することでnからmまでの数値を指定できます。
 *   (例 : 1-4,8 => 1,2,3,4,8)
 * 
 * --------------------------------
 *  〇 Plugin Commands (プラグインコマンド名)
 * 
 *   プラグインコマンド名を変更できます。
 *   コマンドを短くしたり日本語化等が可能です。
 *   
 *   コマンド名を変更しても、デフォルトのコマンドは使用できます。
 * 
 * ================================================================
 * ▼ 注意点
 * --------------------------------
 *  〇 ツクール側の仕様でタイルセットのA4(壁)は上部が通行可能となっています。
 *    隠し通路等を作る際は、通行可能にした両側面を通行不可にすることをお勧めします。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Passable Upper Region Ids
 * @desc 上に表示し通行可能なリージョンIDの配列
 * (範囲指定可)
 * @default 32
 *
 * @param Impassable Upper Region Ids
 * @desc 上に表示し通行できないリージョンIDの配列
 * (範囲指定可)
 * @default 33
 *
 * @param === Command ===
 * @default 【コマンド関連】
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"SetPlayerZ":"SetPlayerZ"}
 * @parent === Command ===
 * 
 *
 */

/*~struct~Plugin:
 * @param SetPlayerZ
 * @desc プレイヤーの高さ設定
 * @default SetPlayerZ
 * 
 */

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_HiddenPassage');
    
    function convertParam(name) {
        var param = parameters[name];
        var result = [];
        if (param) {
            var data = param.split(',');
            for (var i = 0; i < data.length; i++) {
                if (/(\d+)\s*-\s*(\d+)/.test(data[i])) {
                    for (var n = Number(RegExp.$1); n <= Number(RegExp.$2); n++) {
                        result.push(n);
                    }
                } else {
                    result.push(Number(data[i]));
                }
            }
        }
        return result;
    };
    
    MPPlugin.PassableUpperRegionIds = convertParam('Passable Upper Region Ids');
    MPPlugin.ImpassableUpperRegionIds = convertParam('Impassable Upper Region Ids');
    
    MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands']);
    
})();

var Alias = {};

//-----------------------------------------------------------------------------
// Tilemap

//4860
Alias.Tilemap__paintTiles = Tilemap.prototype._paintTiles;
Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var regionId = this._readMapData(startX + x, startY + y, 5);
    this._forceHigher = $gamePlayer.isUpperRegion(regionId);
    Alias.Tilemap__paintTiles.call(this, startX, startY, x, y);
};

//5216
Alias.Tilemap__isHigherTile = Tilemap.prototype._isHigherTile;
Tilemap.prototype._isHigherTile = function(tileId) {
    return this._forceHigher || Alias.Tilemap__isHigherTile.call(this, tileId);
};

//-----------------------------------------------------------------------------
// ShaderTilemap

//5656
Alias.ShaderTilemap__paintTiles = ShaderTilemap.prototype._paintTiles;
ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var regionId = this._readMapData(startX + x, startY + y, 5);
    this._forceHigher = $gamePlayer.isUpperRegion(regionId);
    Alias.ShaderTilemap__paintTiles.call(this, startX, startY, x, y);
};

//-----------------------------------------------------------------------------
// Game_Map

//515
Alias.GaMa_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function(x, y, bit) {
    var regionId = this.regionId(x, y);
    if ($gamePlayer.isUpperRegion(regionId)) {
        return MPPlugin.PassableUpperRegionIds.contains(regionId);
    }
    return Alias.GaMa_checkPassage.call(this, x, y, bit);
};

//-----------------------------------------------------------------------------
// Game_Player

Game_Player.prototype.isUpperRegion = function(regionId) {
    var z = this.mppHiPaZ || 0;
    return (z < regionId && (MPPlugin.PassableUpperRegionIds.contains(regionId) ||
            MPPlugin.ImpassableUpperRegionIds.contains(regionId)));
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1722
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    switch (command) {
        case MPPlugin.PluginCommands.SetPlayerZ:
        case 'SetPlayerZ':
            $gamePlayer.mppHiPaZ = Number(args[0] || 0);
            break;
    }
};




})();

