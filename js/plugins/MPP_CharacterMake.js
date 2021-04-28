//=============================================================================
// MPP_CharacterMake.js
//=============================================================================
// Copyright (c) 2017-2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.7】ゲーム内でキャラクター生成を行えます。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   SetCharGeneBaseKind n kind  # アクター n 番の基礎タイプを変更
 *   SetCharGeneDamage bool n1 n2...
 *                               # アクター n 番の歩行グラフィックを変更
 *   StartCharEdit n             # アクター n 番のキャラクターエディットを開始
 *   
 * アクターのメモ欄:
 *   <geneDef BaseKind:kind>      # 基礎タイプのデフォルト値 kind
 *   <geneDef Parts:ary>          # デフォルトパーツを一括で設定します。
 *   <geneDef Color x:n>          # 色番号 x のデフォルト値 n
 *   <geneDef Color x:-2, r1,g1,b1, r2,g2,b2, r3,g3,b3>
 *                                # 色番号 x のデフォルト値カスタム設定
 * 
 * 特徴を持つオブジェクトのメモ欄:
 *   <gene xxx:n>                 # パーツ名 xxx のパーツ番号 n
 *   <gene Color x:n>             # 色番号 x の値 n
 *   <gene Color x:-2, r1,g1,b1, r2,g2,b2, r3,g3,b3>
 *                                # 色番号 x のカスタム設定
 * 
 * ================================================================
 * ▼ 本プラグイン導入手順
 * --------------------------------
 *  〇 本プラグインを実行するには、キャラクター生成用の画像ファイルが必要です。
 *    実行前に下記のURLを参考にGeneratorフォルダを移してください。
 *  
 *   http://woodpenguin.web.fc2.com/MV_Plugin/CharacterMake.html
 *  
 * --------------------------------
 *  〇 テストプレイを行った際、Generatorフォルダ内にキャラクター生成用のファイル
 *    CharGene.jsonが作成されます。
 *    このファイルがないと動作しないので、Generatorフォルダ内を変更した際には
 *    必ず一度はテストプレイを実行してください。
 *  
 * --------------------------------
 *  〇 容量削減のため、Generatorフォルダ内の使用しないファイルは
 *    削除してください。
 *    子供のキャラクター生成を行わなければ、すべてのKidフォルダが不要です。
 *    フロントビューであれば、SVフォルダは不要です。
 * 
 * 
 * ================================================================
 * ▼ デフォルトパーツの簡易設定
 * --------------------------------
 *  テストプレイ中にキャラクターメイクを実行し、キャラクターメイク画面で
 *  F9キーを押すとデベロッパーツールのConsole画面に現在のキャラクターメイク画像の
 *  パラメータが表示されます。
 *  （デベロッパーツールはF8キーで起動できます）
 *  
 *  ここで表示されたパラメータを、アクターのメモ欄にコピー＆ペーストすると
 *  そのアクターの初期グラフィックがキャラクターメイクで作った画像になります。
 * 
 * 
 * ================================================================
 * ▼ 各パラメータ詳細
 * --------------------------------
 *  〇 基礎タイプ
 *   Male   : 男性
 *   Female : 女性
 *   Kid    : 子供
 *   
 *   基礎タイプが設定されたキャラクターは、キャラクターメイクを行った画像に
 *   切り替わります。
 *   通常の画像ファイルを使用したい場合は、基礎タイプを未設定にしてください。
 * 
 * --------------------------------
 *  〇 パーツ名
 *   Face      : 顔             FrontHair  : 前髪
 *   RearHair  : 後髪           Beard      : ヒゲ
 *   Ears      : 耳             Eyes       : 目
 *   Eyebrows  : 眉             Nose       : 鼻
 *   Mouth     : 口             FacialMark : 紋様
 *   BeastEars : 獣耳           Tail       : 尻尾
 *   Wing      : 羽             Clothing   : 服
 *   Cloak     : マント         AccA       : 装身具1
 *   AccB      : 装身具2        Glasses    : メガネ
 * 
 * --------------------------------
 *  〇 色番号
 *   1  : 肌の色                  2  : 目の色
 *   3  : 毛の色                  4  : 後髪のサブカラー
 *   5  : 紋様の色                6  : 獣耳の色
 *   7  : 服のメインカラー        8  : 服のサブカラー1
 *   9  : 服のサブカラー2         10 : 服のサブカラー3
 *   11 : マントのメインカラー    12 : マントのサブカラー1
 *   13 : 装身具1のメインカラー   14 : 装身具1のサブカラー1
 *   15 : 装身具1のサブカラー2    16 : 装身具2のメインカラー
 *   17 : 装身具2のサブカラー1    18 : 装身具2のサブカラー2
 *   19 : 装身具2のサブカラー3    20 : メガネのメインカラー
 *   21 : メガネのサブカラー1     22 : メガネのサブカラー2
 *   23 : 尻尾の色                24 : 羽の色
 *   
 *   指定する値(n)は Generator/gradients.png ファイルの色となります。
 *   上から何列目の色にするかを指定してください。
 *   -1で色指定なし、-2でカスタムとなります。
 * 
 * 
 * ================================================================
 * ▼ プラグインコマンド 詳細
 * --------------------------------
 *  〇 プラグインコマンド全般
 *   指定する値には変数が使用できます。
 *   v[n] と記述することでn番の変数の値を参照します。
 * 
 * --------------------------------
 *  〇 SetCharGeneBaseKind n kind
 *       n    : アクターID
 *       kind : 基礎タイプ (Male / Female / Kid / 未設定で解除)
 *   
 *   アクター n 番の基礎タイプを変更します。
 *   kindを指定しなかった場合、キャラクター生成が解除されます。
 * 
 * --------------------------------
 *  〇 SetCharGeneDamage bool n1 n2...
 *       bool     : 倒れグラフィックの有効/無効 (true/false)
 *       n1 n2... : 倒れグラフィックの設定を適用するアクターID (複数設定可)
 *   
 *   アクターのグラフィックを倒れグラフフィックに変更したり、
 *   それを解除したりします。
 *   
 *   対象となるアクターは複数指定できます。
 *   間に空白を入れてアクターIDを複数指定してください。
 *   
 *   このコマンドを実行した後は、倒れグラフィックへの変更が完了するまで
 *   ウェイトが入ります。
 * 
 * 
 * ================================================================
 * ▼ アクターのメモ欄 詳細
 * --------------------------------
 *  〇 <geneDef Parts:ary>
 *   デフォルトのパーツを一括で設定します。
 *   aryにカンマで区切った18個の数値を入れてください。
 *  
 * --------------------------------
 *  〇 <geneDef Color x:n>
 *   色番号 x の初期値を n 番にします。
 *  
 * --------------------------------
 *  〇 <geneDef Color x:-2, r1,g1,b1, r2,g2,b2, r3,g3,b3>
 *   最初の値を-2にすることで、色のカスタム設定を行うことができます。
 *   
 *     r1,g1,b1 : ブライト色のrgb
 *     r2,g2,b2 : ノーマル色のrgb
 *     r3,g3,b3 : ダーク色のrgb
 * 
 * 
 * ================================================================
 * ▼ 特徴を持つオブジェクトのメモ欄 詳細
 * --------------------------------
 *  〇 各オブジェクトの優先順位
 *     装備 > 職業 > アクター > ステート
 * 
 * --------------------------------
 *  〇 <gene xxx:n>
 *   このオブジェクトを持つアクターのパーツ名 xxx をパーツ番号 n に
 *   強制変更します。
 *   
 *   パーツ番号はファイル名の p〇〇 の数字を指定します。
 *   -1で未設定となります。
 *  
 * --------------------------------
 *  〇 <gene Color x:n>
 *   このオブジェクトを持つアクターの色番号 x を n 番に強制変更します。
 *  
 * --------------------------------
 *  〇 <gene Color x:-2, r1,g1,b1, r2,g2,b2, r3,g3,b3>
 *   最初のパラメータを-2にすることで、色のカスタム設定を行うことができます。
 *   
 *     r1,g1,b1 : ブライト色のrgb
 *     r2,g2,b2 : ノーマル色のrgb
 *     r3,g3,b3 : ダーク色のrgb
 * 
 * 
 * ================================================================
 * ▼ プラグインパラメータ 詳細
 * --------------------------------
 *  〇 Edit Color?
 *   各パーツの色を変更できるようにするかどうかです。
 *   有効にするとパーツの色を変更できるようになりますが、処理が重くなります。
 * 
 * --------------------------------
 *  〇 Preview List
 *   キャラクターメイクによって作成された画像を表示する順番を設定します。
 *   文字列は大文字小文字どちらも使用できます。
 *   
 *     TV  : 歩行キャラ（順に向きを変更）
 *     TV2 : 歩行キャラ（４方向同時）
 *     TV3 : 歩行キャラ（４方向同時 / 1.5枠使用）
 *     SV  : 戦闘キャラ
 *     FG  : 顔グラフィック
 *     
 *   『戦闘キャラ』は多くの画像を読み込むため、『色の変更』を有効にしていると
 *   特に処理が重くなります。
 * 
 * --------------------------------
 *  〇 Plugin Commands (プラグインコマンド名)
 * 
 *   プラグインコマンド名を変更できます。
 *   コマンドを短くしたり日本語化等が可能です。
 *   
 *   コマンド名を変更しても、デフォルトのコマンドは使用できます。
 * 
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param === Basic ===
 * @default 【基本的な設定】
 * 
 * @param Edit Color?
 * @type boolean
 * @desc カラー変更を可能にするかどうか
 * （画像表示に時間がかかります）
 * @default false
 * @parent === Basic ===
 *
 * @param Parts List
 * @type select[]
 * @option Face
 * @option FrontHair
 * @option RearHair
 * @option Beard
 * @option Ears
 * @option Eyes
 * @option Eyebrows
 * @option Nose
 * @option Mouth
 * @option FacialMark
 * @option BeastEars
 * @option Tail
 * @option Wing
 * @option Clothing
 * @option Cloak
 * @option AccA
 * @option AccB
 * @option Glasses
 * @desc エディット画面のパーツの並び順
 * @default ["Face","FrontHair","RearHair","Beard","Ears","Eyes","Eyebrows","Nose","Mouth","FacialMark","BeastEars","Tail","Wing","Clothing","Cloak","AccA","AccB","Glasses"]
 * @parent === Basic ===
 *
 * @param Preview List
 * @desc プレビュー表示の順番
 * (tv:歩行キャラ, sv:戦闘キャラ, fg:顔グラフィック)
 * @default FG,TV,SV
 * @parent === Basic ===
 *
 * @param Force Parts
 * @type select[]
 * @option Face
 * @option FrontHair
 * @option RearHair
 * @option Beard
 * @option Ears
 * @option Eyes
 * @option Eyebrows
 * @option Nose
 * @option Mouth
 * @option FacialMark
 * @option BeastEars
 * @option Tail
 * @option Wing
 * @option Clothing
 * @option Cloak
 * @option AccA
 * @option AccB
 * @option Glasses
 * @desc 設定が必須なパーツ
 * @default ["Face","Ears","Eyes","Eyebrows","Nose","Mouth"]
 * @parent === Basic ===
 *
 * @param Confirmation Scene?
 * @type boolean
 * @desc 確認画面を入れるかどうか
 * @default true
 * @parent === Basic ===
 *
 *
 * @param === Random ===
 * @default 【ランダム生成】
 * 
 * @param Random Text
 * @desc (制御文字使用可能)
 * @default Shift:  ランダム
 * @parent === Random ===
 *
 * @param Random Parts List
 * @type select[]
 * @option Face
 * @option FrontHair
 * @option RearHair
 * @option Beard
 * @option Ears
 * @option Eyes
 * @option Eyebrows
 * @option Nose
 * @option Mouth
 * @option FacialMark
 * @option BeastEars
 * @option Tail
 * @option Wing
 * @option Clothing
 * @option Cloak
 * @option AccA
 * @option AccB
 * @option Glasses
 * @desc ランダム使用時に変更されるパーツ
 * @default ["Face","FrontHair","RearHair","Beard","Ears","Eyes","Eyebrows","Nose","Mouth","FacialMark","Clothing","AccA","AccB","Glasses"]
 * @parent === Random ===
 *
 * @param Random Color List
 * @desc ランダム使用時に変更される色番号
 * @default 3,7,8
 * @parent === Random ===
 *
 * @param Random SE
 * @type struct<RandomSE>
 * @desc ランダム選択時のSE
 * @default {"Name":"Decision1","Volume":"90","Pitch":"100","Pan":"0"}
 * @parent === Random ===
 *
 * @param Random Background Type
 * @type number
 * @min 0
 * @max 2
 * @desc ランダム表示ウィンドウの背景タイプ
 * (0:通常, 1:暗くする, 2:透明)
 * @default 0
 * @parent === Random ===
 *
 *
 * @param === Terms ===
 * @default 【用語】
 * 
 * @param Command
 * @type struct<Command>
 * @desc 用語（コマンド）
 * @default {"Yes":"はい","No":"いいえ","Default":"元に戻す","Ok":"決定","Custom":"カスタム","Bright":"ブライト","Normal":"ノーマル","Dark":"ダーク"}
 * @parent === Terms ===
 * 
 * @param Message
 * @type struct<Message>
 * @desc 用語（メッセージ）
 * @default {"Confirmation":"このグラフィックでよろしいですか？","Loading":"Loading"}
 * @parent === Terms ===
 * 
 * @param Base Kind
 * @type struct<BaseKind>
 * @desc 用語（基礎タイプ）
 * @default {"Male":"男性","Female":"女性","Kid":"子ども"}
 * @parent === Terms ===
 * 
 * @param Parts
 * @type struct<Parts>
 * @desc 用語（パーツ）
 * @default {"Face":"顔","FrontHair":"前髪","RearHair":"後髪","Beard":"ヒゲ","Ears":"耳","Eyes":"目","Eyebrows":"眉","Nose":"鼻","Mouth":"口","FacialMark":"紋様","BeastEars":"獣耳","Tail":"尻尾","Wing":"羽","Clothing":"服","Cloak":"マント","AccA":"装身具1","AccB":"装身具2","Glasses":"メガネ"}
 * @parent === Terms ===
 * 
 * @param Colors
 * @type struct<Colors>
 * @desc 用語（色）
 * @default {"Color1":"肌の色","Color2":"目の色","Color3":"毛の色","Color4":"サブカラー","Color5":"紋様の色","Color6":"獣耳の色","Color7":"メインカラー","Color8":"サブカラー1","Color9":"サブカラー2","Color10":"サブカラー3","Color11":"メインカラー","Color12":"サブカラー1","Color13":"メインカラー","Color14":"サブカラー1","Color15":"サブカラー2","Color16":"メインカラー","Color17":"サブカラー1","Color18":"サブカラー2","Color19":"サブカラー3","Color20":"メインカラー","Color21":"サブカラー1","Color22":"サブカラー2","Color23":"尻尾の色","Color24":"羽の色"}
 * @parent === Terms ===
 * 
 * 
 * @param === Advanced ===
 * @default 【高度な設定】
 * 
 * @param Manual Color Indexs
 * @type struct<ColorIndexs>[]
 * @desc 色番号の手動設定
 * @default ["{\"RGB\":\"255,235,157\",\"ColorIndex\":\"17\"}","{\"RGB\":\"255,207,23\",\"ColorIndex\":\"17\"}"]
 * @parent === Advanced ===
 * 
 * 
 * @param === Command ===
 * @default 【コマンド関連】
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"SetCharGeneBaseKind":"SetCharGeneBaseKind","SetCharGeneDamage":"SetCharGeneDamage","StartCharEdit":"StartCharEdit"}
 * @parent === Command ===
 * 
 * 
 * 
 */

/*~struct~DefaultParts:
 * @param Face
 * @type number
 * @min -1
 * 
 * @param FrontHair
 * @type number
 * @min -1
 * 
 * @param RearHair
 * @type number
 * @min -1
 * 
 * @param Beard
 * @type number
 * @min -1
 * 
 * @param Ears
 * @type number
 * @min -1
 * 
 * @param Eyes
 * @type number
 * @min -1
 * 
 * @param Eyebrows
 * @type number
 * @min -1
 * 
 * @param Nose
 * @type number
 * @min -1
 * 
 * @param Mouth
 * @type number
 * @min -1
 * 
 * @param FacialMark
 * @type number
 * @min -1
 * 
 * @param BeastEars
 * @type number
 * @min -1
 * 
 * @param Tail
 * @type number
 * @min -1
 * 
 * @param Wing
 * @type number
 * @min -1
 * 
 * @param Clothing
 * @type number
 * @min -1
 * 
 * @param Cloak
 * @type number
 * @min -1
 * 
 * @param AccA
 * @type number
 * @min -1
 * 
 * @param AccB
 * @type number
 * @min -1
 * 
 * @param Glasses
 * @type number
 * @min -1
 * 
 */

/*~struct~RandomSE:
 * @param Name
 * @desc ファイル名
 * @default Decision1
 * @require 1
 * @dir audio/se
 * @type file
 *
 * @param Volume
 * @type number
 * @max 100
 * @desc 音量
 * @default 90
 *
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @desc ピッチ
 * @default 100
 *
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @desc 位相
 * @default 0
 *
 */

/*~struct~Command:
 * @param Yes
 * @default はい
 *
 * @param No
 * @default いいえ
 *
 * @param Default
 * @default 元に戻す
 *
 * @param Ok
 * @default 決定
 *
 * @param Custom
 * @default カスタム
 * 
 * @param Bright
 * @default ブライト
 * 
 * @param Normal
 * @default ノーマル
 * 
 * @param Dark
 * @default ダーク
 * 
 */

/*~struct~Message:
 * @param Confirmation
 * @default このグラフィックでよろしいですか？
 *
 * @param Loading
 * @default Loading
 *
 */

/*~struct~BaseKind:
 * @param Male
 * @default 男性
 *
 * @param Female
 * @default 女性
 *
 * @param Kid
 * @default 子ども
 *
 */

/*~struct~Parts:
 * @param Face
 * @default 顔
 *
 * @param FrontHair
 * @default 前髪
 *
 * @param RearHair
 * @default 後髪
 *
 * @param Beard
 * @default ヒゲ
 *
 * @param Ears
 * @default 耳
 *
 * @param Eyes
 * @default 目
 *
 * @param Eyebrows
 * @default 眉
 *
 * @param Nose
 * @default 鼻
 *
 * @param Mouth
 * @default 口
 *
 * @param FacialMark
 * @default 紋様
 *
 * @param BeastEars
 * @default 獣耳
 *
 * @param Tail
 * @default 尻尾
 *
 * @param Wing
 * @default 羽
 *
 * @param Clothing
 * @default 服
 *
 * @param Cloak
 * @default マント
 *
 * @param AccA
 * @default 装身具1
 *
 * @param AccB
 * @default 装身具2
 *
 * @param Glasses
 * @default メガネ
 *
 */

/*~struct~Colors:
 * @param Color1
 * @desc 肌の色
 * @default 肌の色
 *
 * @param Color2
 * @desc 目の色
 * @default 目の色
 *
 * @param Color3
 * @desc 毛の色
 * @default 毛の色
 *
 * @param Color4
 * @desc 後髪のサブカラー
 * @default サブカラー
 *
 * @param Color5
 * @desc 紋様の色
 * @default 紋様の色
 *
 * @param Color6
 * @desc 獣耳の色
 * @default 獣耳の色
 *
 * @param Color7
 * @desc 服のメインカラー
 * @default メインカラー
 *
 * @param Color8
 * @desc 服のサブカラー1
 * @default サブカラー1
 *
 * @param Color9
 * @desc 服のサブカラー2
 * @default サブカラー2
 *
 * @param Color10
 * @desc 服のサブカラー3
 * @default サブカラー3
 *
 * @param Color11
 * @desc マントのメインカラー
 * @default メインカラー
 *
 * @param Color12
 * @desc マントのサブカラー1
 * @default サブカラー1
 *
 * @param Color13
 * @desc 装身具1のメインカラー
 * @default メインカラー
 *
 * @param Color14
 * @desc 装身具1のサブカラー1
 * @default サブカラー1
 *
 * @param Color15
 * @desc 装身具1のサブカラー2
 * @default サブカラー2
 *
 * @param Color16
 * @desc 装身具2のメインカラー
 * @default メインカラー
 *
 * @param Color17
 * @desc 装身具2のサブカラー1
 * @default サブカラー1
 *
 * @param Color18
 * @desc 装身具2のサブカラー2
 * @default サブカラー2
 *
 * @param Color19
 * @desc 装身具2のサブカラー3
 * @default サブカラー3
 *
 * @param Color20
 * @desc メガネのメインカラー
 * @default メインカラー
 *
 * @param Color21
 * @desc メガネのサブカラー1
 * @default サブカラー1
 *
 * @param Color22
 * @desc メガネのサブカラー2
 * @default サブカラー2
 *
 * @param Color23
 * @desc 尻尾の色
 * @default 尻尾の色
 *
 * @param Color24
 * @desc 羽の色
 * @default 羽の色
 *
 */

/*~struct~Plugin:
 * @param SetCharGeneBaseKind
 * @desc アクター n 番の基礎タイプを変更
 * @default SetCharGeneBaseKind
 *
 * @param SetCharGeneDamage
 * @desc アクター n 番の歩行グラフィックを変更
 * @default SetCharGeneDamage
 *
 * @param StartCharEdit
 * @desc アクター n 番のキャラクターエディットを開始
 * @default StartCharEdit
 *
 */

/*~struct~ColorIndexs:
 * @param RGB
 * @desc 色(rgb)
 * @default 0,0,0
 *
 * @param ColorIndex
 * @type number
 * @desc 色番号
 * @default 0
 *
 */

var MPP = MPP || {};

var $dataCharGene       = null;

(function(exports) {
    'use strict';

var Database = {
    BaseKinds: ['Male', 'Female', 'Kid'],
    Variation: ['Body', 'body', 'Face', 'FrontHair', 'RearHair', 'Beard', 'Ears', 'Eyes',
        'Eyebrows', 'Nose', 'Mouth', 'FacialMark', 'BeastEars', 'Tail', 'Wing',
        'Clothing', 'Cloak', 'AccA', 'AccB', 'Glasses'],
    TVD: ['AccB', 'FrontHair', 'AccA', 'Eyes', 'BeastEars', 'RearHair', 'Wing',
        'Glasses', 'Cloak', 'Tail', 'Beard', 'Clothing', 'FacialMark', 'Body'],
    TV: ['Wing1', 'AccB', 'FrontHair1', 'AccA', 'RearHair1', 'Glasses',
        'BeastEars', 'Cloak1', 'Tail1', 'Clothing1', 'Beard1', 'Clothing2',
        'RearHair2', 'FacialMark', 'Body', 'Beard2', 'FrontHair2', 'Tail2',
        'Cloak2', 'Wing2'],
    SV: ['AccB', 'FrontHair', 'AccA', 'Glasses', 'Ears', 'BeastEars', 'Cloak1',
        'Clothing1', 'Beard', 'Clothing2', 'RearHair1', 'FacialMark', 'body',
        'Tail', 'Cloak2', 'Wing'],
    FG: ['AccB', 'Glasses', 'FrontHair', 'Cloak1', 'AccA', 'BeastEars',
        'Beard', 'Clothing1', 'Ears', 'RearHair1', 'Eyebrows', 'Eyes',
        'FacialMark', 'Nose', 'Mouth', 'Face', 'Clothing2', 'Body', 'Cloak2',
        'RearHair2'],
    Color:{Face:[1], FrontHair:[3], RearHair:[3,4], Beard:[3], Ears:[1],
        Eyes:[2], Eyebrows:[3], Nose:[1], Mouth:[1], FacialMark:[5],
        BeastEars:[6], Tail:[23], Wing:[24], Clothing:[7,8,9,10],
        Cloak:[11,12], AccA:[13,14,15], AccB:[16,17,18,19], Glasses:[20,21,22]},
    gradients:[0,0, 36,17, 24,12, 0,23, 0,23, 53,17, 0,23, 53,17, 53,17, 53,17,
        53,17, 53,17, 53,17, 53,17, 53,17, 53,17, 53,17, 53,17, 53,17, 53,17,
        53,17, 53,17, 53,17, 0,23, 53,17],
    
    DefaultParts:[1,1,1,-1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,-1,-1],
    DefaultKidParts:[1,0,0,-1,0,0,0,0,0,-1,-1,-1,-1,0,-1,-1,-1,-1],
    
    colorIndexs:{'255,255,255':0, '249,193,157':1, '44,128,203':2,
        '252,203,10':3, '184,146,197':4, '0,146,150':5, '211,206,199':6,
        '174,134,130':7, '254,157,30':8, '28,118,208':9, '217,164,4':10,
        '216,172,0':11, '163,7,8':12, '211,206,194':13, '218,52,110':14,
        '164,201,17':15, '199,132,7':16, '192,211,210':17, '65,85,182':18,
        '186,59,69':19, '153,153,153':20, '204,186,210':21, '96,126,75':22,
        '230,214,189':23, '167,214,214':24},
        //'240,193,153':1, '241,205,11':3, '0,0,0':5,
        //'206,204,192':13, '206,40,107':14, '155,203,6':15, '168,210,210':24,
        //'165,132,129':7, '242,156,27':8, '69,103,204':9},
    
    nonColors:['79,65,60', '87,87,85', '170,175,175', '56,59,59',
        '123,66,0', '73,14,18', '218,121,18', '211,136,79', '255,252,255',
        '32,29,26', '183,118,38', '37,38,66', '0,0,0']
};

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_CharacterMake');
    var keys = Object.keys(parameters);
    for (var i = 0; i < keys.length; i++) {
        try {
            parameters[keys[i]] = JSON.parse(parameters[keys[i]]);
        } catch (e) {
            
        }
    }
    
    //Basic
    MPPlugin.EditColor = !!parameters['Edit Color?'];
    MPPlugin.PartsList = parameters['Parts List'];
    MPPlugin.PreviewList = (parameters['Preview List'] || 'TV').split(',').map( t => t.toUpperCase() );
    MPPlugin.ForceParts = parameters['Force Parts'];
    MPPlugin.ConfirmationScene = parameters['Confirmation Scene?'];

    //Random
    MPPlugin.RandomPartsList = parameters['Random Parts List'];
    MPPlugin.RandomColorList = eval('[' + parameters['Random Color List'] + ']');
    var param = parameters['Random SE'];
    MPPlugin.RandomSE = {
        name:param.Name,
        volume:Number(param.Volume),
        pitch:Number(param.Pitch),
        pan:Number(param.Pan)
    };
    MPPlugin.RandomBackgroundType = parameters['Random Background Type'];

    //Terms
    MPPlugin.text = {};
    param = parameters['Command'];
    MPPlugin.text.Yes = param['Yes'];
    MPPlugin.text.No = param['No'];
    MPPlugin.text.Default = param['Default'];
    MPPlugin.text.Ok = param['Ok'];
    MPPlugin.text.Custom = param['Custom'];
    MPPlugin.text.CustomCommands = [param['Bright'], param['Normal'], param['Dark']];

    param = parameters['Message'];
    MPPlugin.text.Confirmation = param['Confirmation'];
    MPPlugin.text.Loading = param['Loading'];
    MPPlugin.text.Random = parameters['Random Text'];

    param = parameters['Base Kind'];
    MPPlugin.text.Male = param['Male'];
    MPPlugin.text.Female = param['Female'];
    MPPlugin.text.Kid = param['Kid'];

    param = parameters['Parts'];
    MPPlugin.text.Face = param['Face'];
    MPPlugin.text.FrontHair = param['FrontHair'];
    MPPlugin.text.RearHair = param['RearHair'];
    MPPlugin.text.Beard = param['Beard'];
    MPPlugin.text.Ears = param['Ears'];
    MPPlugin.text.Eyes = param['Eyes'];
    MPPlugin.text.Eyebrows = param['Eyebrows'];
    MPPlugin.text.Nose = param['Nose'];
    MPPlugin.text.Mouth = param['Mouth'];
    MPPlugin.text.FacialMark = param['FacialMark'];
    MPPlugin.text.BeastEars = param['BeastEars'];
    MPPlugin.text.Tail = param['Tail'];
    MPPlugin.text.Wing = param['Wing'];
    MPPlugin.text.Clothing = param['Clothing'];
    MPPlugin.text.Cloak = param['Cloak'];
    MPPlugin.text.AccA = param['AccA'];
    MPPlugin.text.AccB = param['AccB'];
    MPPlugin.text.Glasses = param['Glasses'];

    MPPlugin.colorText = [null];
    param = parameters['Colors'];
    for (var i = 1; i <= 24; i++) {
        MPPlugin.colorText[i] = param['Color' + i];
    }
    
    //Advanced
    MPPlugin.GenerateSpeed = 32;
    MPPlugin.ManualColorIndexs = parameters['Manual Color Indexs'] || [];
    for (var i = 0; i < MPPlugin.ManualColorIndexs.length; i++) {
        MPPlugin.ManualColorIndexs[i] = JSON.parse(MPPlugin.ManualColorIndexs[i]);
    }
    
    //Command
    MPPlugin.PluginCommands = parameters['Plugin Commands'] || {};
    
})();

var Alias = {};
var Method = {};

//-----------------------------------------------------------------------------
// GenerateEntry

function GenerateEntry(){
    this.initialize.apply(this, arguments);
}

MPP.GenerateEntry = GenerateEntry;

GenerateEntry.prototype.initialize = function(type, item){
    this._type = type;
    this._item = item;
    this._index = 0;
    this._loaded = false;
};

GenerateEntry.prototype.start = function(){
    var type = this._type;
    var kind = this._item.kind;
    
    var bitmaps = [];
    var colors = [];
    var editColor = MPPlugin.EditColor;
    var filenames = this.getFilenames();
    for (var i = 0; i < filenames.length; i++) {
        var filename = filenames[i];
        if (type !== 'FG') {
            bitmaps.unshift(ImageManager.requestGenerator(type, kind, filename));
            if (editColor) {
                var path = type + '/' + kind + '/' + filename;
                colors.unshift(GenerateColors.get(path));
            }
        } else {
            bitmaps.unshift(ImageManager.requestGenerator('Face', kind, filename, true));
            if (editColor) {
                var path = type + '/' + kind + '/' + filename;
                var m = (/_m(\d\d\d)/.test(filename) ? Number(RegExp.$1) : 0);
                colors.unshift(GenerateColors.get(path, m));
            }
        }
    }
    this._bitmaps = bitmaps;
    this._colors = colors;
    //ImageManager.rotationRequest();
};

GenerateEntry.prototype.getFilenames = function(){
    var type = this._type;
    var kind = this._item.kind;
    var data = this._item.data;
    
    var variation = Database.Variation;
    var typeList = Database[type];
    var kindList = $dataCharGene[type][kind];
    var faceKindList = $dataCharGene.Face[kind];
    var filenames = [];
    for (var i = 0; i < typeList.length; i++) {
        var partsName = typeList[i];
        var partsList = kindList[partsName];
        var baseName = (/\d$/.test(partsName) ? partsName.slice(0,-1) : partsName);
        var partsIndex = variation.indexOf(baseName);
        if (partsList && partsIndex >= 0) {
            var partsId = data[partsIndex];
            if (partsId >= 0 && partsList.contains(partsId)) {
                if (type !== 'FG') {
                    filenames.push(type+'_'+partsName+'_p'+partsId.padZero(2));
                } else {
                    var fList = faceKindList[partsName][partsId];
                    filenames = filenames.concat(fList);
                }
            }
        }
    }
    return filenames;
};

GenerateEntry.prototype.createColorData = function(){
    if (MPPlugin.EditColor) {
        var actorData = this._item.data.slice(20);
        this._defaultColors = this.getDefaultColors(actorData);
        this._gradData = this.getGradData(actorData);
    } else {
        this._defaultColors = null;
        this._gradData = null;
    }
};

GenerateEntry.prototype.getDefaultColors = function(data) {
    var colors = [-1];
    for (var i = 0; i < 24; i++) {
        if (data[i * 10] === -1) colors.push(i);
    }
    return colors;
};

GenerateEntry.prototype.getGradData = function(data) {
    var gradients = ImageManager.loadGeneGradients();
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 24;
    var context = canvas.getContext('2d');
    for (var i = 0; i < 24; i++) {
        var c = data[i * 10];
        if (c >= 0) {
            context.drawImage(gradients._canvas, 0,c*4,256,1, 0,i,256,1);
        } else if (c === -2) {
            var d = data.slice(i * 10, i * 10 + 10);
            var gradient = context.createLinearGradient(0,0,256,0);
            gradient.addColorStop(0, 'rgb(%1,%2,%3)'.format(d[1], d[2], d[3]));
            gradient.addColorStop(0.5, 'rgb(%1,%2,%3)'.format(d[4], d[5], d[6]));
            gradient.addColorStop(1, 'rgb(%1,%2,%3)'.format(d[7], d[8], d[9]));
            context.fillStyle = gradient;
            context.fillRect(0, i, 256, 1);
        }
    }
    return context.getImageData(0, 0, 256, 24).data;
};

GenerateEntry.prototype.onGenerate = function(capacity) {
    
    var i = this._item.index;
    var defColors = this._defaultColors;
    var gradData = this._gradData;
    for (;;) {
        var bitmap = this._bitmaps[this._index];
        if (!bitmap.isReady()) {
            if (bitmap.isRequestReady()) {
                bitmap.decode();
            } else {
                bitmap.startRequest();
            }
            break;
        }
        var color = this._colors[this._index];
        if (color && !color.isReady()) break;
        capacity -= this._bitmap._onGenerate(i, bitmap, color, defColors, gradData);
        this._index++;
        if (this._index === this._bitmaps.length) {
            this.endGenerate();
            break;
        }
        if (capacity <= 0)
            break;
    }
    return capacity;
};

GenerateEntry.prototype.endGenerate = function() {
    this._defaultColors = null;
    this._gradData = null;
    this._bitmaps.splice(0);
    this._loaded = true;
    this._bitmap._endGenerate();
};

GenerateEntry.prototype.isReady = function() {
    return this._loaded;
};

//-----------------------------------------------------------------------------
// GenerateMap

function GenerateMap() {
    throw new Error('This is a static class');
}

MPP.GenerateMap = GenerateMap;

GenerateMap._items = {};

GenerateMap.add = function(path, entry) {
    this._items[path] = entry;
    if (this._path === path) this._path = null;
};

GenerateMap.update = function() {
    var gradients = ImageManager.loadGeneGradients();
    if (!gradients.isReady()) return;
    var capacity = MPPlugin.GenerateSpeed;
    var keys = Object.keys(this._items);
    for (var i = 0; i < keys.length; i++) {
        var item = this._items[keys[i]];
        capacity = item.onGenerate(capacity);
        if (item.isReady())
            delete this._items[keys[i]];
        if (capacity <= 0)
            return;
    }
    
};

GenerateMap.isReady = function() {
    return Object.keys(this._items).length === 0;
};

//-----------------------------------------------------------------------------
// GenerateColor

function GenerateColor() {
    this.initialize.apply(this, arguments);
}

MPP.GenerateColor = GenerateColor;

GenerateColor.prototype.initialize = function(path) {
    this._path = path + '_c';
    this._data = null;
    this._image = null;
};

GenerateColor.prototype.load = function() {
    if (this._path && !this._image) {
        this._image = new Image();
        this._image.src = 'Generator/' + this._path + '.png';
        this._image.onload = GenerateColor.prototype._onLoad.bind(this);
        this._image.onerror = GenerateColor.prototype._onError.bind(this);
    }
};

GenerateColor.prototype.setColor = function(c) {
    this._data = [Infinity, c];
};

GenerateColor.prototype.isReady = function() {
    return !!this._data;
};

GenerateColor.prototype._onLoad = function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var w = Math.max(this._image.width || 0, 1);
    var h = Math.max(this._image.height || 0, 1);
    canvas.width = w;
    canvas.height = h;
    context.drawImage(this._image, 0, 0);
    
    var data = [];
    var pixels = context.getImageData(0, 0, w, h).data;
    var lastIndex = 0;
    for (var i = 0; i < pixels.length; i += 4) {
        var index = this.getColorIndex(pixels[i+0], pixels[i+1], pixels[i+2]);
        if (lastIndex !== index) {
            data.push(i - 4, lastIndex < 0 ? 0 : lastIndex);
            if (index === -1) {
                var rgb = pixels[i+0] + ',' + pixels[i+1] + ',' + pixels[i+2];
                var x = i / 4 % w;
                var y = Math.floor(i / 4 / w);
                GenerateColors.error(rgb, this._path, x, y);
            }
            lastIndex = index;
        }
    }
    this._data = data;
    this._image = null;
};

GenerateColor.prototype.getColorIndex = function(r, g, b) {
//    if (r === 255 && g === 255 && b === 255) return 0;
//    if (r === 249 && g === 193 && b === 157) return 1;
//    if (r ===  44 && g === 128 && b === 203) return 2;
//    if (r === 252 && g === 203 && b ===  10) return 3;
//    if (r === 184 && g === 146 && b === 197) return 4;
//    if (r ===   0 && g === 146 && b === 150) return 5;
//    if (r === 211 && g === 206 && b === 199) return 6;
//    if (r === 174 && g === 134 && b === 130) return 7;
//    if (r === 254 && g === 157 && b ===  30) return 8;
//    if (r ===  28 && g === 118 && b === 208) return 9;
//    if (r === 217 && g === 164 && b ===   4) return 10;
//    if (r === 216 && g === 172 && b ===   0) return 11;
//    if (r === 163 && g ===   7 && b ===   8) return 12;
//    if (r === 211 && g === 206 && b === 194) return 13;
//    if (r === 218 && g ===  52 && b === 110) return 14;
//    if (r === 164 && g === 201 && b ===  17) return 15;
//    if (r === 199 && g === 132 && b ===   7) return 16;
//    if (r === 192 && g === 211 && b === 210) return 17;
//    if (r ===  65 && g ===  85 && b === 182) return 18;
//    if (r === 186 && g ===  59 && b ===  69) return 19;
//    if (r === 153 && g === 153 && b === 153) return 20;
//    if (r === 204 && g === 186 && b === 210) return 21;
//    if (r ===  96 && g === 126 && b ===  75) return 22;
//    if (r === 230 && g === 214 && b === 189) return 23;
//    if (r === 167 && g === 214 && b === 214) return 24;
//    //if (r ===  79 && g ===  65 && b ===  60) return 25;
//    
//    if (r === 240 && g === 193 && b === 153) return 1; // What?
//    if (r === 241 && g === 205 && b ===  11) return 3; // What?
//    if (r ===   0 && g ===   0 && b ===   0) return 5; // What?
//    //if (r ===  87 && g ===  87 && b ===  85) return 0;
//    //if (r === 170 && g === 175 && b === 175) return 0;
//    //if (r ===  56 && g ===  59 && b ===  59) return 0;
//    //if (r === 123 && g ===  66 && b ===   0) return 0;
//    //if (r ===  73 && g ===  14 && b ===  18) return 0;
//    //if (r === 218 && g === 121 && b ===  18) return 0;
//    //if (r === 211 && g === 136 && b ===  79) return 0;
//    //if (r === 255 && g === 252 && b === 255) return 0;
//    if (r === 206 && g === 204 && b === 192) return 13; // What?
//    if (r === 206 && g ===  40 && b === 107) return 14; // What?
//    if (r === 155 && g === 203 && b ===   6) return 15; // What?
//    if (r === 168 && g === 210 && b === 210) return 24; // What?
//    //if (r ===  32 && g ===  29 && b ===  26) return 0;
//    //if (r === 183 && g === 118 && b ===  38) return 0;
//    //if (r ===  37 && g ===  38 && b ===  66) return 0;
//    if (r === 165 && g === 132 && b === 129) return 7; // What?
//    if (r === 242 && g === 156 && b ===  27) return 8; // What?
//    if (r ===  69 && g === 103 && b === 204) return 9; // What!?
    
    var key = r + ',' + g + ',' + b;
    var index = Database.colorIndexs[key];
    if (index !== undefined) return index;
    
    if (Database.nonColors.contains(key)) return 0;
    
    var colorIndexs = MPPlugin.ManualColorIndexs;
    for (var i = 0; i < colorIndexs.length; i++) {
        if (colorIndexs[i].RGB === key) 
            return colorIndexs[i].ColorIndex;
    }
    
    return -1;
};

GenerateColor.prototype._onError = function() {
    this._data = [Infinity, 0];
};

//-----------------------------------------------------------------------------
// GenerateColors

function GenerateColors() {
    throw new Error('This is a static class');
}

MPP.GenerateColors = GenerateColors;

GenerateColors._items = {};
GenerateColors._errorRGB = [];
GenerateColors._queue = [];

GenerateColors.get = function(path, c) {
    var item = this._items[path];
    if (!item) {
        item = new GenerateColor(path);
        if (c === undefined) {
            this._queue.push(item);
        } else {
            item.setColor(c);
        }
        this._items[path] = item;
    }
    return item;
};

GenerateColors.error = function(rgb, path, x, y) {
    if (!this._errorRGB.contains(rgb)) {
        this._errorRGB.push(rgb);
        var text = 'File Name: ' + path + ',  ';
        text += 'X: ' + x + ',  Y: ' + y + ',  RGB: ' + rgb;
        console.log(text);
    }
};

GenerateColors.update = function() {
    if (this._queue.length === 0) return;
    
    var top = this._queue[0];
    if (top.isReady()) {
        this._queue.shift();
        top = this._queue[0];
        if (top) top.load();
    } else {
        top.load();
    }
};

//-----------------------------------------------------------------------------
// Bitmap

Bitmap.generate = function(type) {
    var bitmap = new Bitmap();
    
    bitmap._geneType = type;
    bitmap._geneData = [];
    bitmap._geneCount = 0;
    switch (type) {
        case 'TVD': case 'TV':
            bitmap.resize(144, 192);
            break;
        case 'SV':
            bitmap.resize(576, 384);
            break;
        case 'FG':
            bitmap.resize(144 * 4, 144 * 2);
            break;
    }
    return bitmap;
};

Bitmap.prototype.setGenerate = function(item) {
    var entry = new GenerateEntry(this._geneType, item);
    entry.start();
    entry.createColorData();
    entry._bitmap = this;
    this._geneData[item.index] = item;
    GenerateMap.add(item.key + ':' +item.index, entry);
    
    if (this._geneType === 'FG') {
        var dx = item.index % 4 * 144;
        var dy = Math.floor(item.index / 4) * 144;
        this.clearRect(dx, dy, 144, 144);
    } else {
        this.clear();
    }
    this._context.globalCompositeOperation = 'source-over';
    
    this._loadingState = 'generateLoading';
    this._decodeAfterRequest = true;
};

Bitmap.prototype._onGenerate = function(index, source, color, defColors, gradData) {
    var context = this._context;

    var bw = source.width;
    var bh = source.height;
    var dx = index % 4 * bw;
    var dy = Math.floor(index / 4) * bh;
    if (color) {

        var change = false;
        var rgbToX = Method.rgbToX;

        var imageData = source._context.getImageData(0, 0, bw, bh);
        var pixels = imageData.data;
        var colorData = color._data.clone();
        var cn = -1, ci = 0;
        var pixelMax = pixels.length;
        for (var n = 0; n < pixelMax; n += 4) {
            if (cn < n) {
                if (colorData.length === 0) break;
                cn = colorData.shift();
                ci = colorData.shift() - 1;
                if (defColors.contains(ci)) {
                    n = cn;
                    continue;
                }
                change = true;
            }
            if (pixels[n+3] === 0) continue;

            var x = (ci * 256 + rgbToX(pixels[n+0], pixels[n+1], pixels[n+2])) * 4;
            pixels[n+0] = gradData[x+0];
            pixels[n+1] = gradData[x+1];
            pixels[n+2] = gradData[x+2];
        }
        if (change) {
            var tempCanvas = document.createElement('canvas');
            var tempContext = tempCanvas.getContext('2d');
            tempCanvas.width = bw;
            tempCanvas.height = bh;
            tempContext.putImageData(imageData, 0, 0);
            context.drawImage(tempCanvas, dx, dy);
            return 4;
        } else {
            context.drawImage(source._canvas, dx, dy);
            return 2;
        }
    } else {
        context.drawImage(source._canvas, dx, dy);
        return 1;
    }
    
};

Bitmap.prototype._endGenerate = function() {
    this._setDirty();
    this._loadingState = 'loaded';
    if (this._geneType === 'TVD') {
        var bw = this.width;
        var bh = Math.floor(this.height / 4);
        this._context.drawImage(this._canvas, 0,0,bw,bh, 0,bh,bw,bh);
        this._context.drawImage(this._canvas, 0,0,bw,bh*2, 0,bh*2,bw,bh*2);
    }
};

Method.rgbToX = function(r, g, b) {
    return Math.floor(255 - (Math.min(r, g, b) + Math.max(r, g, b)) / 2);
};

Bitmap.prototype.equalsGeneData = function(item) {
    if (!this._geneData) return false;
    var genaItem = this._geneData[item.index];
    return genaItem && genaItem.kind === item.kind && genaItem.data.equals(item.data);
};

//-----------------------------------------------------------------------------
// DataManager

//61
Alias.DaMa_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function() {
    Alias.DaMa_loadDatabase.call(this);
    this._createEdit = Utils.isOptionValid('test') && Utils.isNwjs();
    if (this._createEdit) {
        this.createEditData();
    } else {
        this.loadGeneData('$dataCharGene', 'CharGene.json');
    }
};

DataManager.createEditData = function() {
    var fs = require('fs');
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    
    $dataCharGene = {};
    
    var re = /^icon_([A-Za-z]+)_p(\d\d)/;
    $dataCharGene.Variation = this.createGenePartsList('Variation', re);
    
    re = /^TVD_([A-Za-z]+)_p(\d\d)\./;
    $dataCharGene.TVD = this.createGenePartsList('TVD', re);
    
    re = /^TV_([A-Za-z]+\d?)_p(\d\d)\./;
    $dataCharGene.TV = this.createGenePartsList('TV', re);

    re = /^SV_([A-Za-z]+\d?)_p(\d\d)\./;
    $dataCharGene.SV = this.createGenePartsList('SV', re);
    
    var list1 = {}, list2 = {};
    var dirPath = path.join(base, 'Generator/Face');
    if (fs.existsSync(dirPath)) {
        var baseKinds = Database.BaseKinds;
        for (var i = 0; i < baseKinds.length; i++) {
            var kind = baseKinds[i];
            var files1 = {}, files2 = {};
            var kindPath = 'Generator/Face/'+kind+'/';
            dirPath = path.join(base, kindPath);
            if (fs.existsSync(dirPath)) {
                var dir = fs.readdirSync(dirPath);
                dir.sort();
                for (var n = 0; n < dir.length; n++) {
                    var names = dir[n].split('_');
                    var name = names[1];
                    var p = Number(names[2].slice(1));
                    if (!files1[name]) files1[name] = [];
                    files1[name].push(p);
                    
                    if (!files2[name]) files2[name] = {};
                    if (!files2[name][p]) files2[name][p] = [];
                    files2[name][p].push(dir[n].slice(0, -4));
                }
            }
            list1[kind] = files1;
            list2[kind] = files2;
        }
    }
    $dataCharGene.FG = list1;
    $dataCharGene.Face = list2;
    
    var json = JsonEx.stringify($dataCharGene);
    this.saveGeneData('Generator/', 'CharGene.json', json);
};

DataManager.createGenePartsList = function(type, re) {
    var fs = require('fs');
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    
    var list = {};
    var dirPath = path.join(base, 'Generator/' + type + '/');
    if (fs.existsSync(dirPath)) {
        var baseKinds = Database.BaseKinds;
        for (var i = 0; i < baseKinds.length; i++) {
            var kind = baseKinds[i];
            var files = {};
            var kindPath = 'Generator/' + type + '/' + kind + '/';
            dirPath = path.join(base, kindPath);
            if (fs.existsSync(dirPath)) {
                var dir = fs.readdirSync(dirPath);
                for (var n = 0; n < dir.length; n++) {
                    if (re.test(dir[n])) {
                        var name = RegExp.$1;
                        if (!files[name]) files[name] = [];
                        files[name].push(Number(RegExp.$2));
                    }
                }
            }
            list[kind] = files;
        }
    }
    return list;
};

//92
Alias.DaMa_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!this._createEdit && !window['$dataCharGene']) {
        return false;
    }
    return Alias.DaMa_isDatabaseLoaded.call(this);
};

DataManager.saveGeneData = function(kindPath, name, json) {
    var fs = require('fs');
    var path = require('path');
    
    var base = path.dirname(process.mainModule.filename);
    var data = LZString.compressToBase64(json);
    var filePath = path.join(base, kindPath) + name;
    fs.writeFileSync(filePath, data);
};

DataManager.loadGeneData = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'Generator/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            var json = LZString.decompressFromBase64(xhr.responseText);
            window[name] = JsonEx.parse(json);
        }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();
};

DataManager.existGeneImage = function(type, kind, parts, p) {
    if (type === undefined) return true;
    var node = $dataCharGene[type];
    if (node === undefined) return false;
    if (kind === undefined) return true;
    node = node[kind];
    if (node === undefined) return false;
    if (parts === undefined) return true;
    node = node[parts];
    if (node === undefined) return false;
    if (p === undefined) return true;
    return node.contains(p);
};

//-----------------------------------------------------------------------------
// ImageManager

ImageManager._geneImageCache = null;

ImageManager.createGeneCache = function() {
    this._geneImageCache = new ImageCache();
};

ImageManager.deleteGeneCache = function() {
    this._geneImageCache = null;
};

//36
Alias.ImMa_loadCharacter = ImageManager.loadCharacter;
ImageManager.loadCharacter = function(filename, hue) {
    if (/^\$MPP_Gene(TVD|TV)/.test(filename)) {
        return this.loadGenerateBitmap(filename, RegExp.$1);
    } else {
        return Alias.ImMa_loadCharacter.call(this, filename, hue);
    }
};

//40
Alias.ImMa_loadFace = ImageManager.loadFace;
ImageManager.loadFace = function(filename, hue) {
    if (/^MPP_GeneFG/.test(filename)) {
        return this.loadGenerateBitmap(filename, 'FG');
    } else {
        return Alias.ImMa_loadFace.call(this, filename, hue);
    }
};

//52
Alias.ImMa_loadSvActor = ImageManager.loadSvActor;
ImageManager.loadSvActor = function(filename, hue) {
    if (/^MPP_GeneSV/.test(filename)) {
        return this.loadGenerateBitmap(filename, 'SV');
    } else {
        return Alias.ImMa_loadSvActor.call(this, filename, hue);
    }
};

ImageManager.loadGenerateBitmap = function(filename, type) {
    var item = this.makeGenerateItem(filename, type);
    var cache = this._geneImageCache || this._imageCache;
    var bitmap = cache.get(item.key);
    if (!bitmap) {
        bitmap = Bitmap.generate(type);
        bitmap.smooth = (type === 'FG');
        cache.add(item.key, bitmap);
    }
    if (!bitmap.equalsGeneData(item)) {
        bitmap.setGenerate(item);
    }
    return bitmap;
};

ImageManager.makeGenerateItem = function(filename, type) {
    var params = filename.split('/');
    var item = {};
    item.key = params.shift();
    item.actorId = Number(params.shift());
    item.index = 0;
    item.kind = params.shift();
    item.data = params.map(Number);
    if (type === 'FG') {
        item.key += Math.floor((item.actorId - 1) / 8);
        item.index = item.actorId % 8 - 1;
    } else {
        item.key += item.actorId;
    }
    if (this._geneImageCache) item.key = type + ',' + item.kind + ',' + params.toString();
    return item;
};

ImageManager.loadGenerator = function(type, kind, filename, smooth) {
    var folder = 'Generator/' + type + '/' + kind + '/';
    return this.loadBitmap(folder, filename, 0, smooth || false);
};

ImageManager.loadGeneGradients = function() {
    return this.loadBitmap('Generator/', 'gradients', 0, false);
};

//118
Alias.ImMa_isReady = ImageManager.isReady
ImageManager.isReady = function() {
    return Alias.ImMa_isReady.call(this) && GenerateMap.isReady();
};


//153
Alias.ImMa_reserveCharacter = ImageManager.reserveCharacter;
ImageManager.reserveCharacter = function(filename, hue, reservationId) {
    if (/^\$MPP_Gene(TVD|TV)/.test(filename)) {
        return this.reserveGenerateBitmap(filename, RegExp.$1, reservationId);
    } else {
        return Alias.ImMa_reserveCharacter.call(this, filename, hue, reservationId);
    }
};

//157
Alias.ImMa_reserveFace = ImageManager.reserveFace;
ImageManager.reserveFace = function(filename, hue, reservationId) {
    if (/^MPP_GeneFG/.test(filename)) {
        return this.reserveGenerateBitmap(filename, 'FG', reservationId);
    } else {
        return Alias.ImMa_reserveFace.call(this, filename, hue, reservationId);
    }
};

//169
Alias.ImMa_reserveSvActor = ImageManager.reserveSvActor;
ImageManager.reserveSvActor = function(filename, hue, reservationId) {
    if (/^MPP_GeneSV/.test(filename)) {
        return this.reserveGenerateBitmap(filename, 'SV', reservationId);
    } else {
        return Alias.ImMa_reserveSvActor.call(this, filename, hue, reservationId);
    }
};

ImageManager.reserveGenerateBitmap = function(filename, type, reservationId) {
    var bitmap = this.loadGenerateBitmap(filename, type);
    var item = this.makeGenerateItem(filename, type);
    var cache = this._geneImageCache || this._imageCache;
    cache.reserve(item.key, bitmap, reservationId || this._defaultReservationId);
    return bitmap;
};

ImageManager.reserveGenerator = function(type, kind, filename, reservationId) {
    return this.reserveBitmap('Generator/' + type + '/' + kind + '/', filename,
        0, kind === 'FG', reservationId);
    return this.reserveBitmap('Generator/', 'gradients', 0, false);
};

ImageManager.reserveGeneGradients = function() {
    return this.reserveBitmap('Generator/', 'gradients', 0, false);
};


//ImageManager._mppCM_requestQueue = new RequestQueue();

//236
Alias.ImMa_requestCharacter = ImageManager.requestCharacter;
ImageManager.requestCharacter = function(filename, hue) {
    if (/^\$MPP_Gene(TVD|TV)/.test(filename)) {
        return this.requestGenerateBitmap(filename, RegExp.$1);
    } else {
        return Alias.ImMa_requestCharacter.call(this, filename, hue);
    }
};

//240
Alias.ImMa_requestFace = ImageManager.requestFace;
ImageManager.requestFace = function(filename, hue) {
    if (/^MPP_GeneFG/.test(filename)) {
        return this.requestGenerateBitmap(filename, 'FG');
    } else {
        return Alias.ImMa_requestFace.call(this, filename, hue);
    }
};

//252
Alias.ImMa_requestSvActor = ImageManager.requestSvActor;
ImageManager.requestSvActor = function(filename, hue) {
    if (/^MPP_GeneSV/.test(filename)) {
        return this.requestGenerateBitmap(filename, 'SV');
    } else {
        return Alias.ImMa_requestSvActor.call(this, filename, hue);
    }
};

ImageManager.requestGenerateBitmap = function(filename, type) {
    var item = this.makeGenerateItem(filename, type);
    var entry = new GenerateEntry(type, item);
    entry.start();
    return null;
};

ImageManager.requestGenerator = function(type, kind, filename) {
    var folder = 'Generator/' + type + '/' + kind + '/';
    return this.requestBitmap(folder, filename, 0, false);
};

//304
Alias.ImMa_update = ImageManager.update;
ImageManager.update = function(){
    Alias.ImMa_update.call(this);
    //this._mppCM_requestQueue.update();
    GenerateMap.update();
    GenerateColors.update();
};

//308
//Alias.ImMa_clearRequest2 = ImageManager.clearRequest;
//ImageManager.clearRequest = function(){
//    Alias.ImMa_clearRequest2.apply(this, arguments);
//    this._mppCM_requestQueue.clear();
//};

//ImageManager.rotationRequest = function(){
//    var requestQueue = this._requestQueue;
//    this._requestQueue = this._mppCM_requestQueue;
//    this._mppCM_requestQueue = requestQueue;
//};

//-----------------------------------------------------------------------------
// Game_Actor

//25
Alias.GaAc_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Alias.GaAc_initMembers.call(this);
    this._geneKind = null;
    this._geneParts = [];
    this._geneColors = [];
    this._geneCharacterDamage = false;
};

//46
Alias.GaAc_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Alias.GaAc_setup.call(this, actorId);
    this.initCharGene();
};

Game_Actor.prototype.initCharGene = function() {
    var actor = this.actor();
    var meta = actor.meta;
    this._geneKind = meta['geneDef BaseKind'];
    var defParts;
    if (meta['geneDef Parts']) {
        defParts = meta['geneDef Parts'].split(',').map(Number);
    } else {
        defParts = Method.getDefParts(this._geneKind);
    }
    this._geneParts = Method.checkForceParts(defParts, this._geneKind);
    var geneColors = Method.getGeneColors();
    this._geneColors = this.setupGeneColors(geneColors, 'geneDef Color ', [actor]);
    this._geneCharacterDamage = false;
    this.refreshImageName();
};

Game_Actor.prototype.clearCharGene = function() {
    this._geneParts = Method.getDefParts(this._geneKind);
    this._geneColors = Method.getGeneColors();
    this._geneCharacterDamage = false;
    this.refreshImageName();
};
Method.getDefParts = function(kind) {
    return kind === 'Kid' ? Database.DefaultKidParts : Database.DefaultParts;
};
Method.getGeneColors = function() {
    var ganeColors = [];
    for (var i = 0; i < 24; i++) {
        ganeColors.push(-1, 255,255,255, 136,136,136, 0,0,0);
    }
    return ganeColors;
};

//368
Alias.GaAc_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    Alias.GaAc_refresh.call(this);
    this.refreshImageName();
};

Game_Actor.prototype.refreshImageName = function() {
    if (this._geneKind && !Database.BaseKinds.contains(this._geneKind)) {
        alert('存在しない基礎タイプです : ' + this._geneKind);
        this._geneKind = null;
    }
    if (this._geneKind) {
        var dataStr = this.getGeneDataStr();
        var charaType = (this._geneCharacterDamage ? 'TVD/' : 'TV/');
        this._characterName = '$MPP_Gene' + charaType + dataStr;
        this._characterIndex = 0;
        this._faceName = 'MPP_GeneFG/' + dataStr;
        this._faceIndex = this._actorId % 8 - 1;
        this._battlerName =  'MPP_GeneSV/' + dataStr;
        $gamePlayer.refresh();
    }
};

Game_Actor.prototype.getGeneDataStr = function() {
    var traits = this.traitObjects().reverse();
    var parts = Method.checkForceParts(this._geneParts, this._geneKind);
    parts = Method.checkGeneParts(parts, traits);
    var colors = this.setupGeneColors(this._geneColors, 'gene Color ', traits);
    var s = '/';
    var dataStr = this._actorId + s + this._geneKind + '/1/1';
    for (var i = 0; i < parts.length; i++) {
        dataStr += s + parts[i];
    }
    for (var i = 0; i < colors.length; i++) {
        dataStr += s + colors[i];
    }
    return dataStr;
};
Method.checkForceParts = function(parts, kind) {
    var varList = $dataCharGene.Variation[kind];
    if (!varList)  return parts;
    var variation = Database.Variation;
    var forceParts = MPPlugin.ForceParts;
    return parts.map(function(p, i) {
        var partsName = variation[i + 2];
        if (forceParts.contains(partsName) && p === -1 &&
                varList[partsName].length > 0) {
            return varList[partsName][0];
        }
        return p;
    });
};
Method.checkGeneParts = function(parts, traits) {
    var variation = Database.Variation;
    return parts.map(function(p, i) {
        var name = 'gene ' + variation[i + 2];
        for (var n = 0; n < traits.length; n++) {
            var meta = traits[n].meta;
            if (meta[name])  return Number(meta[name]);
        }
        return p;
    });
};

Game_Actor.prototype.setupGeneColors = function(colors, baseName, traits) {
    colors = colors.clone();
    for (var n = 0; n < 24; n++) {
        var name = baseName + (n + 1);
        for (var m = 0; m < traits.length; m++) {
            var meta = traits[m].meta;
            if (meta[name]) {
                var ary = meta[name].split(',').map(Number);
                for (var l = 0; l < ary.length; l++) {
                    colors[n * 10 + l] = ary[l];
                }
                break;
            }
        }
    }
    return colors;
};

Game_Actor.prototype.setGeneKind = function(kind) {
    if (this._geneKind !== kind) {
        if (this._geneKind && !kind) {
            this.initImages();
        }
        this._geneKind = kind;
        this.clearCharGene();
    }
};

Game_Actor.prototype.setGeneParts = function(parts, n, setOnly) {
    var index = Database.Variation.indexOf(parts) - 2;
    if (index >= 0 && this._geneParts[index] !== n) {
        this._geneParts[index] = n;
        if (!setOnly) this.refreshImageName();
    }
};

Game_Actor.prototype.setGeneColor = function(number, index, setOnly) {
    if (number > 0 && number <= 24) {
        this._geneColors[(number - 1) * 10] = index;
        if (!setOnly) this.refreshImageName();
    }
};

Game_Actor.prototype.setGeneColorCustom = function(n1, n2, r, g, b) {
    if (n1 > 0) {
        this._geneColors.splice((n1 - 1) * 10 + 1 + n2 * 3, 3, r, g, b);
        this.refreshImageName();
    }
};

Game_Actor.prototype.setCharacterDamage = function(damage) {
    if (this._geneCharacterDamage !== damage) {
        this._geneCharacterDamage = damage;
        this.refreshImageName();
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//27
Alias.GaIn_clear = Game_Interpreter.prototype.clear;
Game_Interpreter.prototype.clear = function() {
    Alias.GaIn_clear.call(this);
    this._geneDamage = false;
    this._actors = [];
};

//110
Alias.GaIn_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    if (this._waitMode === 'GeneDamage') {
        waiting = !GenerateMap.isReady();
        if (!waiting) {
            for (var i = 0; i < this._actors.length; i++) {
                this._actors[i].setCharacterDamage(this._geneDamage);
            }
            this._waitMode = '';
        }
    }
    return waiting || Alias.GaIn_updateWaitMode.call(this);
};

//1722
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    var v = $gameVariables._data;
    switch (command) {
        case MPPlugin.PluginCommands.SetCharGeneBaseKind:
        case 'SetCharGeneBaseKind':
            var actor = $gameActors.actor(eval(args[0]));
            if (actor) actor.setGeneKind(args[1]);
            break;
        case MPPlugin.PluginCommands.SetCharGeneDamage:
        case 'SetCharGeneDamage':
            this._actors = [];
            this._geneDamage = !!eval(args[0]);
            for (var i = 1; i < args.length; i++) {
                var actor = $gameActors.actor(eval(args[i]));
                if (actor && actor._geneKind) {
                    var dataStr = actor.getGeneDataStr();
                    var charaType = (this._geneDamage ? 'TVD/' : 'TV/');
                    var characterName = '$MPP_Gene' + charaType + dataStr;
                    ImageManager.loadCharacter(characterName, 0);
                    this._actors.push(actor);
                }
            }
            if (this._actors.length > 0) {
                this._waitMode = 'GeneDamage';
            }
            break;
        case MPPlugin.PluginCommands.StartCharEdit:
        case 'StartCharEdit':
            if (!$gameParty.inBattle()) {
                var actor = $gameActors.actor(eval(args[0]));
                if (actor && actor._geneKind) {
                    $gameParty.setMenuActor(actor);
                    SceneManager.push(Scene_CharacterEdit);
                }
            }
            break;
    }
};

//-------------------------------------------------------------------
// Window_CharEdit_Category

function Window_CharEdit_Category() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_Category = Window_CharEdit_Category;

Window_CharEdit_Category.prototype = Object.create(Window_Command.prototype);
Window_CharEdit_Category.prototype.constructor = Window_CharEdit_Category;

Window_CharEdit_Category.prototype.initialize = function(x, y, actor) {
    this._actor = actor;
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_CharEdit_Category.prototype.windowWidth = function() {
    return 200;
};

Window_CharEdit_Category.prototype.numVisibleRows = function() {
    var maxHeight = Graphics.boxHeight - 64 - this.standardPadding() * 2
    return Math.floor(maxHeight / this.itemHeight());
};

Window_CharEdit_Category.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._partsWindow) {
        this._partsWindow.setCategory(this.currentSymbol());
    }
};

Window_CharEdit_Category.prototype.makeCommandList = function() {
    var list = MPPlugin.PartsList;
    var variation = $dataCharGene.Variation[this._actor._geneKind];
    if (!variation) return;
    for (var i = 0; i < list.length; i++) {
        var symbol = list[i];
        if (variation[symbol] && variation[symbol].length > 0) {
            this.addCommand(MPPlugin.text[symbol], symbol);
        }
    }
};

Window_CharEdit_Category.prototype.setPartsWindow = function(partsWindow) {
    this._partsWindow = partsWindow;
    this.update();
};

Window_CharEdit_Category.prototype.processOk = function() {
    if (this.isOkTriggered()) {
        Window_Command.prototype.processOk.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_CharEdit_PartsList

function Window_CharEdit_PartsList() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_PartsList = Window_CharEdit_PartsList;

Window_CharEdit_PartsList.prototype = Object.create(Window_Selectable.prototype);
Window_CharEdit_PartsList.prototype.constructor = Window_CharEdit_PartsList;

Window_CharEdit_PartsList.prototype.initialize = function(x, y, actor) {
    var width = this.itemWidth() * this.maxCols() + this.standardPadding() * 2;
    var height = this.itemHeight() * 2 + this.standardPadding() * 2;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = actor;
    this._category = 'none';
    this._data = [];
};

Window_CharEdit_PartsList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
        this.selectParts();
    }
};

Window_CharEdit_PartsList.prototype.maxCols = function() {
    return 4;
};

Window_CharEdit_PartsList.prototype.spacing = function() {
    return 0;
};

Window_CharEdit_PartsList.prototype.itemWidth = function() {
    return 72;
};

Window_CharEdit_PartsList.prototype.itemHeight = function() {
    return 72;
};

Window_CharEdit_PartsList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_CharEdit_PartsList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : 0;
};

Window_CharEdit_PartsList.prototype.makeItemList = function() {
    var kind = this._actor._geneKind;
    var parts = (kind ? $dataCharGene.Variation[kind] : null);
    var list = (parts ? parts[this._category] : null);
    this._data = (list ? list.clone() : []);
    if (!MPPlugin.ForceParts.contains(this._category)) {
        this._data.unshift(-1);
    }
};

Window_CharEdit_PartsList.prototype.selectParts = function() {
    var c = Database.Variation.indexOf(this._category) - 2;
    var p = this._actor._geneParts[c];
    var index = this._data.indexOf(p);
    this.select(index >= 0 ? index : 0);
};

Window_CharEdit_PartsList.prototype.update = function() {
    var lastIndex = this._index;
    Window_Selectable.prototype.update.call(this);
    if (this.isOpenAndActive() && lastIndex !== this._index) {
        this.setActorParts();
    }
    if (this._colorWindow) {
        this._colorWindow.setItem(this._category, this.item());
    }
};

Window_CharEdit_PartsList.prototype.getBitmap = function(index) {
    var p = this._data[index];
    if (p < 0) return null;
    var name = 'icon_' + this._category + '_p' + p.padZero(2);
    return ImageManager.requestGenerator('Variation', this._actor._geneKind, name);
};

Window_CharEdit_PartsList.prototype.setActorParts = function() {
    this._actor.setGeneParts(this._category, this.item());
};

Window_CharEdit_PartsList.prototype.drawItem = function(index) {
    var bitmap = this.getBitmap(index);
    if (bitmap) {
        var process = this.variationDrawer.bind(this, index, bitmap);
        if (process()) this.addUpdateDrawer(process);
    }
};

Window_CharEdit_PartsList.prototype.variationDrawer = function(index, bitmap) {
    if (bitmap.isReady()) {
        var rect = this.itemRect(index);
        var dx = rect.x + Math.floor((rect.width - 64) / 2);
        var dy = rect.y + Math.floor((rect.height - 64) / 2);
        this.contents.blt(bitmap, 0, 0, 64, 64, dx, dy);
        return false;
    } else if (bitmap._loadingState === 'purged') {
        bitmap.decode();
    }
    return true;
};

Window_CharEdit_PartsList.prototype.processOk = function() {
    if (this.isOkTriggered()) {
        Window_Selectable.prototype.processOk.call(this);
    }
};

Window_CharEdit_PartsList.prototype.processCancel = function() {
    if (this.isCancelTriggered()) {
        SoundManager.playCancel();
        this.updateInputData();
        this.deactivate();
        this.callHandler('keyCancel');
    } else {
        Window_Selectable.prototype.processCancel.call(this);
    }
};

Window_CharEdit_PartsList.prototype.setColorWindow = function(colorWindow) {
    this._colorWindow = colorWindow;
    this.update();
};

Window_CharEdit_PartsList.prototype.refresh = function() {
    this.clearUpdateDrawer();
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

//-----------------------------------------------------------------------------
// Window_CharEdit_ColorSlot

function Window_CharEdit_ColorSlot() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_ColorSlot = Window_CharEdit_ColorSlot;

Window_CharEdit_ColorSlot.prototype = Object.create(Window_Command.prototype);
Window_CharEdit_ColorSlot.prototype.constructor = Window_CharEdit_ColorSlot;

Window_CharEdit_ColorSlot.prototype.initialize = function(x, y, width, actor) {
    this._width = width;
    Window_Command.prototype.initialize.call(this, x, y);
    this._actor = actor;
    this._category = 'none';
    this._parts = 0;
    this._colorLoaded = false;
    this._colorData = [];
    this.deactivate();
};

Window_CharEdit_ColorSlot.prototype.windowWidth = function() {
    return this._width;
};

Window_CharEdit_ColorSlot.prototype.numVisibleRows = function() {
    return 4;
};

Window_CharEdit_ColorSlot.prototype.currentBottomY = function() {
    return this.y + this.standardPadding() + 
            Math.floor(this.index() / this.maxCols() + 1) * this.itemHeight() -
            this._scrollY;
};

Window_CharEdit_ColorSlot.prototype.setItem = function(category, parts) {
    if (this._category !== category || this._parts !== parts) {
        this._category = category;
        this._parts = parts;
        this.loadColorData();
        this.clearCommandList();
        this.makeItemList();
        this.checkColorData();
        this.refresh();
        this.select(0);
    }
};

Window_CharEdit_ColorSlot.prototype.loadColorData = function() {
    this._colorData = [];
    var kind = this._actor._geneKind;
    var cate = this._category;
    var parts = this._parts;
    if (DataManager.existGeneImage('TV', kind, cate, parts)) {
        var path = 'TV/'+kind+'/TV_'+cate+'_p'+parts.padZero(2);
        this._colorData.push(GenerateColors.get(path));
    }
    if (DataManager.existGeneImage('TV', kind, cate+'1', parts)) {
        var path = 'TV/'+kind+'/TV_'+cate+'1_p'+parts.padZero(2);
        this._colorData.push(GenerateColors.get(path));
    }
    if (DataManager.existGeneImage('TV', kind, cate+'2', parts)) {
        path = 'TV/'+kind+'/TV_'+cate+'2_p'+parts.padZero(2);
        this._colorData.push(GenerateColors.get(path));
    }
    this._colorLoaded = (this._colorData.length === 0);
};

Window_CharEdit_ColorSlot.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    this.checkColorData();
};

Window_CharEdit_ColorSlot.prototype.checkColorData = function() {
    if (!this._colorLoaded && this.isColorReady()) {
        var colors = [];
        for (var n = 0; n < this._colorData.length; n++) {
            var data = this._colorData[n]._data;
            for (var m = 1; m < data.length; m += 2) {
                colors.push(data[m]);
            }
        }
        var list = this._list;
        for (var n = 1; n < list.length; n++) {
            list[n].enabled = colors.contains(list[n].ext);
        }
        this.refresh();
        this._colorLoaded = true;
    }
};

Window_CharEdit_ColorSlot.prototype.isColorReady = function() {
    for (var i = 0; i < this._colorData.length; i++) {
        if (!this._colorData[i].isReady()) return false;
    }
    return true;
};

Window_CharEdit_ColorSlot.prototype.processCancel = function() {
    if (this.isCancelTriggered()) {
        SoundManager.playCancel();
        this.updateInputData();
        this.deactivate();
        this.callHandler('keyCancel');
    } else {
        Window_Command.prototype.processCancel.call(this);
    }
};

Window_CharEdit_ColorSlot.prototype.makeItemList = function() {
    var list = Database.Color[this._category] || [];
    for (var i = 0; i < list.length; i++) {
        var c = list[i];
        this.addCommand(MPPlugin.colorText[c], 'color', i === 0, c);
    }
};

Window_CharEdit_ColorSlot.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
};

Window_CharEdit_ColorSlot.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var name = this.commandName(index);
    var c = this._list[index].ext;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    var data = this._actor._geneColors.slice(c * 10 - 10, c * 10);
    Method.drawColor.call(this, data, rect.x, rect.y);
    this.drawText(name, rect.x + 36, rect.y, rect.width - 36);
};

Method.drawColor = function(data, x, y) {
    this.contents.fillRect(x + 3, y + 3, 30, 30, 'rgba(0,0,0,0.5)');
    this.contents.fillRect(x + 4, y + 4, 28, 28, 'white');
    var c = data[0];
    if (c === -1) {
        for (var i = 0; i < 28; i++) {
            var dx = x + 4 + (i < 27 ? 28 - i - 2 : 0);
            var dw = (i === 0 || i === 27 ? 2 : 3);
            this.contents.fillRect(dx, y + 4 + i, dw, 1, 'red');
        }
    } else if (c >= 0) {
        var bitmap = ImageManager.loadGeneGradients();
        for (var i = 0; i < 26; i++) {
            var color = bitmap.getPixel(i * 5 + 5, c * 4);
            this.contents.fillRect(x + 5 + i, y + 5, 1, 26, color);
        }
    } else {
        var bitmap = Method.createGeneGradBitmap(data);
        for (var i = 0; i < 26; i++) {
            var color = bitmap.getPixel(i * 5 + 5, 0);
            this.contents.fillRect(x + 5 + i, y + 5, 1, 26, color);
        }
    }
};

Method.createGeneGradBitmap = function(data) {
    var bitmap = new Bitmap(256, 1);
    var context = bitmap.context;
    var gradient = context.createLinearGradient(0,0,256,0);
    gradient.addColorStop(0, 'rgb(%1,%2,%3)'.format(data[1], data[2], data[3]));
    gradient.addColorStop(0.5, 'rgb(%1,%2,%3)'.format(data[4], data[5], data[6]));
    gradient.addColorStop(1, 'rgb(%1,%2,%3)'.format(data[7], data[8], data[9]));
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 1);
    return bitmap;
};

//-----------------------------------------------------------------------------
// Window_CharEdit_ColorList

function Window_CharEdit_ColorList() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_ColorList = Window_CharEdit_ColorList;

Window_CharEdit_ColorList.prototype = Object.create(Window_Command.prototype);
Window_CharEdit_ColorList.prototype.constructor = Window_CharEdit_ColorList;

Window_CharEdit_ColorList.prototype.initialize = function(actor) {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
    this._actor = actor;
    this.deactivate();
};

Window_CharEdit_ColorList.prototype.windowWidth = function() {
    return (this.itemWidth() + this.spacing()) * this.maxCols() - 
            this.spacing() + this.standardPadding() * 2;
};

Window_CharEdit_ColorList.prototype.numVisibleRows = function() {
    return 5;
};

Window_CharEdit_ColorList.prototype.maxCols = function() {
    return 6;
};

Window_CharEdit_ColorList.prototype.spacing = function() {
    return 6;
};

Window_CharEdit_ColorList.prototype.itemWidth = function() {
    return 36;
};

Window_CharEdit_ColorList.prototype.cursorDown = function(wrap) {
    if (this.index() >= this.maxItems() - this.maxCols()) {
        this.select(this.maxItems() - 1);
    } else {
        Window_Command.prototype.cursorDown.call(this, wrap);
    }
};

Window_CharEdit_ColorList.prototype.makeCommandList = function() {
    var n = this._number * 2;
    this.addCommand(-1, 'color');
    var startIndex = Database.gradients[n];
    var maxColors = Database.gradients[n + 1];
    for (var i = 0; i < maxColors; i++) {
        this.addCommand(i + startIndex, 'color');
    }
    this.addCommand(-2, 'custom');
};

Window_CharEdit_ColorList.prototype.setup = function(number) {
    this._number = number;
    this.refresh();
    var colorIndex = number > 0 ? this._actor._geneColors[number * 10 - 10] : 0;
    var index = 0;
    var list = this._list;
    for (var i = 0; i < list.length; i++) {
        if (list[i].name === colorIndex) {
            index = i;
            break;
        }
    }
    this.select(index);
    this.activate();
    this.open();
};

Window_CharEdit_ColorList.prototype.itemRect = function(index) {
    if (index >= 0 && this.commandSymbol(index) === 'custom') {
        var i = index - 1;
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.contentsWidth();
        rect.height = this.itemHeight();
        rect.x = 0;
        rect.y = Math.floor(i / maxCols + 1) * rect.height - this._scrollY;
        return rect;
    } else {
        return Window_Selectable.prototype.itemRect.call(this, index);
    }
};

Window_CharEdit_ColorList.prototype.update = function() {
    var lastIndex = this._index;
    Window_Selectable.prototype.update.call(this);
    if (this.isOpenAndActive() && lastIndex !== this._index) {
        this.setActorColor();
    }
};

Window_CharEdit_ColorList.prototype.setActorColor = function() {
    if (this.currentSymbol() === 'color') {
        this._actor.setGeneColor(this._number, this.commandName(this.index()));
    }
};

Window_CharEdit_ColorList.prototype.drawItem = function(index) {
    var c = this.commandName(index);
    var rect = this.itemRect(index);
    if (c === -2) {
        this.drawText(MPPlugin.text.Custom, rect.x, rect.y, rect.width, 'center');
    } else {
        Method.drawColor.call(this, [c], rect.x, rect.y);
    }
};

//-----------------------------------------------------------------------------
// Window_CharEdit_ColorCustom

function Window_CharEdit_ColorCustom() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_ColorCustom = Window_CharEdit_ColorCustom;

Window_CharEdit_ColorCustom.prototype = Object.create(Window_Selectable.prototype);
Window_CharEdit_ColorCustom.prototype.constructor = Window_CharEdit_ColorCustom;

Window_CharEdit_ColorCustom.prototype.initialize = function(x, y, width, actor) {
    var height = this.fittingHeight(2);
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this._actor = actor;
    this._colors = [0,0,0, 0,0,0, 0,0,0];
};

Window_CharEdit_ColorCustom.prototype.maxCols = function() {
    return 3;
};

Window_CharEdit_ColorCustom.prototype.maxItems = function() {
    return 3;
};

Window_CharEdit_ColorCustom.prototype.spacing = function() {
    return 36;
};

Window_CharEdit_ColorCustom.prototype.setup = function(number) {
    this._number = number;
    this._actor.setGeneColor(number, -2);
    this.refresh();
    this.select(1);
    this.activate();
    this.open();
};

Window_CharEdit_ColorCustom.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += rect.height;
    return rect;
};

Window_CharEdit_ColorCustom.prototype.drawItem = function(index) {
    var name = MPPlugin.text.CustomCommands[index];
    var rect = this.itemRect(index);
    this.drawText(name, rect.x, rect.y, rect.width, 'center');
};

Window_CharEdit_ColorCustom.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
    var x = 12;
    var width = this.contentsWidth() - 24;
    var height = this.lineHeight() - 6;
    var n = this._number;
    var c = this._actor._geneColors.slice(n * 10 - 9, n * 10);
    var context = this.contents.context;
    var gradient = context.createLinearGradient(x,3, x + width, 3);
    gradient.addColorStop(0, 'rgb(%1,%2,%3)'.format(c[0], c[1], c[2]));
    gradient.addColorStop(0.5, 'rgb(%1,%2,%3)'.format(c[3], c[4], c[5]));
    gradient.addColorStop(1, 'rgb(%1,%2,%3)'.format(c[6], c[7], c[8]));
    context.fillStyle = gradient;
    context.fillRect(x, 3, width, height);
    this.contents._setDirty();
};

//-----------------------------------------------------------------------------
// Window_CharEdit_ColorRgb

function Window_CharEdit_ColorRgb() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_ColorRgb = Window_CharEdit_ColorRgb;

Window_CharEdit_ColorRgb.prototype = Object.create(Window_Selectable.prototype);
Window_CharEdit_ColorRgb.prototype.constructor = Window_CharEdit_ColorRgb;

Window_CharEdit_ColorRgb.prototype.initialize = function(actor) {
    var width = 382;
    var height = this.fittingHeight(4);
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
    this._actor = actor;
    this._color = [0,0,0];
    this._sliderIndex = -1;
};

Window_CharEdit_ColorRgb.prototype.maxItems = function() {
    return 4;
};

Window_CharEdit_ColorRgb.prototype.itemWidth = function() {
    return 288;
};

Window_CharEdit_ColorRgb.prototype.isOpenAndActive = function() {
    return Window_Selectable.prototype.isOpenAndActive.call(this) &&
            this._sliderIndex < 0;
};

Window_CharEdit_ColorRgb.prototype.cursorRight = function() {
    var index = this.index();
    if (index < 3 && this._color[index] < 255) {
        this._color[index] = Math.min(this._color[index] + 17, 255);
        SoundManager.playCursor();
        this.redrawCurrentItem();
    }
};

Window_CharEdit_ColorRgb.prototype.cursorLeft = function() {
    var index = this.index();
    if (index < 3 && this._color[index] > 0) {
        this._color[index] = Math.max(this._color[index] - 17, 0);
        SoundManager.playCursor();
        this.redrawCurrentItem();
    }
};

Window_CharEdit_ColorRgb.prototype.setup = function(n1, n2) {
    if (this._customWindow) {
        var window = this._customWindow;
        this.x = window.x + Math.floor((window.width - this.width) * n2 / 2);
        this.y = window.y + window.height;
    }
    this._number1 = n1;
    this._number2 = n2;
    var n = (n1 - 1) * 10 + 1 + n2 * 3;
    this._color = this._actor._geneColors.slice(n, n + 3);
    this.refresh();
    this.select(0);
    this.activate();
    this.open();
};

Window_CharEdit_ColorRgb.prototype.setActorColor = function() {
    var c = this._color;
    this._actor.setGeneColorCustom(this._number1, this._number2, c[0], c[1], c[2]);
};

Window_CharEdit_ColorRgb.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateSlider();
};

Window_CharEdit_ColorRgb.prototype.updateSlider = function() {
    if (this._sliderIndex < 0) {
        var index = this.index();
        if (index < 3 && TouchInput.isTriggered()) {
            var tx = this.canvasToLocalX(TouchInput.x) - this.standardPadding() - 88;
            if (tx >= 0 && tx < 192) {
                SoundManager.playCursor();
                this._sliderIndex = index;
            }
        }
    }
    if (this._sliderIndex >= 0) {
        if (TouchInput.isPressed()) {
            var index = this.index();
            var lc = this._color[index];
            var tx = this.canvasToLocalX(TouchInput.x) - this.standardPadding();
            tx -= 88 + 4;
            var tw = 192 - 8;
            var c = Math.round(255 * tx / tw / 17) * 17;
            this._color[index] = c.clamp(0, 255);
            if (lc !== this._color[index]) {
                //SoundManager.playCursor();
                this.redrawCurrentItem();
            }
        } else {
            this._sliderIndex = -1;
        }
    }
};

Window_CharEdit_ColorRgb.prototype.processOk = function() {
    if (this.index() === 3) {
        Window_Selectable.prototype.processOk.call(this);
    }
};

Window_CharEdit_ColorRgb.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    if (index < 3) {
        var name, color;
        if (index === 0) {
            name = 'R:';
            color = 'red';
        } else if (index === 1) {
            name = 'G:';
            color = 'lime';
        } else {
            name = 'B:';
            color = 'blue';
        }
        var c = this._color[index];
        this.drawText(name + c, rect.x + 6, rect.y, rect.width);
        var dx = rect.x + 88;
        var dy = rect.y + Math.floor(rect.height / 2);
        this.drawSlider(dx, dy, 192, 8, c / 255, color);
        return;
    } else {
        this.drawText(MPPlugin.text.Ok, rect.x + 6, rect.y, rect.width, 'center');
    }
};

Window_CharEdit_ColorRgb.prototype.drawSlider = function(x, y, width, height, value, color) {
    var context = this.contents.context;
    var dx = x + height / 2;
    var dw = width - height;
    context.save();
    
    context.strokeStyle = 'gray';
    context.lineWidth = height;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(dx, y);
    context.lineTo(dx + dw, y);
    context.stroke();
    var gradient = context.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, color);
    context.strokeStyle = gradient;
    context.lineWidth = height - 2;
    context.stroke();
    
    context.restore();
    
    var vx = dx + dw * value;
    context.fillStyle = 'gainsboro';
    context.shadowColor = 'black';
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowBlur = 6;
    context.beginPath();
    context.arc(vx, y, 9, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = 'gray';
    context.shadowColor = 'rgba(0,0,0,0)';
    context.stroke();
    
    context.restore();
    this.contents._setDirty();
};

Window_CharEdit_ColorRgb.prototype.redrawItem = function(index) {
    Window_Selectable.prototype.redrawItem.call(this, index);
    this.refreshColor();
};

Window_CharEdit_ColorRgb.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
    this.refreshColor();
};

Window_CharEdit_ColorRgb.prototype.refreshColor = function() {
    var x = 288 + 2;
    var y = 2;
    var width = this.contentsWidth() - x - 2;
    var height = this.lineHeight() * 3 - 4;
    this.contents.clearRect(x, y, width, height);
    this.contents.fillRect(x, y, width, height, 'black');
    this.contents.fillRect(x+1, y+1, width-2, height-2, 'white');
    var color = 'rgb(%1)'.format(this._color.join());
    this.contents.fillRect(x+2, y+2, width-4, height-4, color);
};

//-----------------------------------------------------------------------------
// Window_CharEdit_Preview

function Window_CharEdit_Preview() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_Preview = Window_CharEdit_Preview;

Window_CharEdit_Preview.prototype = Object.create(Window_Base.prototype);
Window_CharEdit_Preview.prototype.constructor = Window_CharEdit_Preview;

Window_CharEdit_Preview._directionPattern = [2, 4, 8, 6];
Window_CharEdit_Preview._battlerPattern = [0, 7, 2, 10];

Window_CharEdit_Preview.prototype.initialize = function(x, y, actor) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = actor;
    this._animeCount = 0;
    this._animeIndex = 0;
    this._animePattern = 0;
};

Window_CharEdit_Preview.prototype.windowWidth = function() {
    return this.itemX(MPPlugin.PreviewList.length) + this.standardPadding() * 2;
};

Window_CharEdit_Preview.prototype.windowHeight = function() {
    return 144 + this.standardPadding() * 2;
};

Window_CharEdit_Preview.prototype.itemX = function(index) {
    var x = 0;
    for (var i = 0; i < index; i++) {
        x += this.itemWidth(i);
    }
    return x;
};

Window_CharEdit_Preview.prototype.itemWidth = function(index) {
    return (MPPlugin.PreviewList[index] === "TV3" ? 216 : 144);
};

Window_CharEdit_Preview.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._characterName !== this._actor.characterName()) {
        this._characterName = this._actor.characterName();
        this.redrawAllItem();
    }
    this._animeCount++;
    if (this._animeCount === 24) {
        this._animeCount = 0;
        this._animePattern++;
        if (this._animePattern === 8) {
            this._animePattern = 0;
            this._animeIndex = (this._animeIndex + 1) % 4;
        }
    }
};

Window_CharEdit_Preview.prototype.refresh = function() {
    this.contents.clear();
    this.redrawAllItem();
};

Window_CharEdit_Preview.prototype.redrawAllItem = function() {
    this.clearUpdateDrawer();
    for (var i = 0; i < MPPlugin.PreviewList.length; i++) {
        this.redrawItem(i);
    }
};

Window_CharEdit_Preview.prototype.redrawItem = function(index) {
    var actor = this._actor;
    var bitmap;
    switch (MPPlugin.PreviewList[index]) {
        case 'TV': case 'TV2': case 'TV3':
            bitmap = ImageManager.loadCharacter(actor.characterName());
            break;
        case 'SV':
            bitmap = ImageManager.loadSvActor(actor.battlerName());
            break;
        case 'FG':
            bitmap = ImageManager.loadFace(actor.faceName());
            break;
    }
    if (bitmap) {
        if (!bitmap.isReady()) {
            this.drawLoading(index);
        }
        var process = this.itemDrawer.bind(this, index, bitmap);
        if (process()) this.addUpdateDrawer(process);
    }
};

Window_CharEdit_Preview.prototype.redrawItem2 = function(index) {
    var x = this.itemX(index);
    var width = this.itemWidth(index);
    this.contents.clearRect(x, 0, width, 144);
    switch (MPPlugin.PreviewList[index]) {
        case 'TV':
            var d = Window_CharEdit_Preview._directionPattern[this._animeIndex];
            this.drawActorCharacter(this._actor, x + 72, 128, d, 2);
            break;
        case 'TV2':
            this.drawActorCharacter(this._actor, x + 36, 68, 2, 4/3);
            this.drawActorCharacter(this._actor, x + 108, 68, 8, 4/3);
            this.drawActorCharacter(this._actor, x + 36, 140, 4, 4/3);
            this.drawActorCharacter(this._actor, x + 108, 140, 6, 4/3);
            break;
        case 'TV3':
            this.drawActorCharacter(this._actor, x + 36, 104+4, 4, 1.5);
            this.drawActorCharacter(this._actor, x + 108, 68+4, 8, 1.5);
            this.drawActorCharacter(this._actor, x + 108, 140+4, 2, 1.5);
            this.drawActorCharacter(this._actor, x + 180, 104+4, 6, 1.5);
            break;
        case 'SV':
            this.drawActorBattler(this._actor, x + 72, 136, 2);
            break;
        case 'FG':
            this.drawActorFace(this._actor, x, 0, Window_Base._faceWidth, Window_Base._faceHeight);
            break;
    }
};

Window_CharEdit_Preview.prototype.itemDrawer = function(index, bitmap) {
    if (bitmap.isReady() && this._animeCount === 0) {
        this.redrawItem2(index);
    }
    return true;
};

Window_CharEdit_Preview.prototype.drawLoading = function(index) {
    if (index >= 0) {
        var text = MPPlugin.text.Loading;
        var dx = this.itemX(index);
        var dy = Math.floor((144 - this.lineHeight()) / 2);
        var dw = this.itemWidth(index);
        this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_CharEdit_Preview.prototype.drawCharacter = function(characterName, characterIndex, x, y, direction, rate) {
    var bitmap = ImageManager.loadCharacter(characterName);
    var big = ImageManager.isBigCharacter(characterName);
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var pattern = this._animePattern % 4;
    pattern = (pattern < 3 ? pattern : 1);
    var d = (direction - 2) / 2;
    var sx = (characterIndex % 4 * 3 + pattern) * pw;
    var sy = (Math.floor(characterIndex / 4) * 4 + d) * ph;
    var dw = pw * rate, dh = ph * rate;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - dw / 2, y - dh, dw, dh);
};

Window_CharEdit_Preview.prototype.drawActorCharacter = function(actor, x, y, direction, rate) {
    this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y, direction, rate || 1);
};

Window_CharEdit_Preview.prototype.drawActorBattler = function(actor, x, y, rate) {
    var bitmap = ImageManager.loadSvActor(actor.battlerName())
    var motionIndex = Window_CharEdit_Preview._battlerPattern[this._animeIndex];
    var pattern = this._animePattern % 4;
    pattern = (pattern < 3 ? pattern : 1);
    var cw = bitmap.width / 9;
    var ch = bitmap.height / 6;
    var cx = Math.floor(motionIndex / 6) * 3 + pattern;
    var cy = motionIndex % 6;
    var dw = cw * rate, dh = ch * rate;
    this.contents.blt(bitmap, cx * cw, cy * ch, cw, ch, x - dw / 2, y - dh, dw, dh);
};

//-----------------------------------------------------------------------------
// Window_CharEdit_Random

function Window_CharEdit_Random() {
    this.initialize.apply(this, arguments);
}

MPP.Window_CharEdit_Random = Window_CharEdit_Random;

Window_CharEdit_Random.prototype = Object.create(Window_Base.prototype);
Window_CharEdit_Random.prototype.constructor = Window_CharEdit_Random;

Window_CharEdit_Random.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, this.fittingHeight(1));
    var text = MPPlugin.text.Random;
    var allPadding = (this.textPadding() + this.standardPadding()) * 2;
    this.width = this.textWidth(text) + allPadding;
    this.setBackgroundType(MPPlugin.RandomBackgroundType);
    this.createContents();
    this.refresh();
};

Window_CharEdit_Random.prototype.standardPadding = function() {
    return 8;
};

Window_CharEdit_Random.prototype.textPadding = function() {
    return 12;
};

Window_CharEdit_Random.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_CharEdit_Random.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(MPPlugin.text.Random, this.textPadding(), 0);
};

Window_CharEdit_Random.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.processHandling();
};

Window_CharEdit_Random.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (Input.isTriggered('shift') ||
                (TouchInput.isTriggered() && this.isTouchedInsideFrame())) {
            this.processOk();
        }
    }
};

Window_CharEdit_Random.prototype.isTouchedInsideFrame = function() {
    return Window_Selectable.prototype.isTouchedInsideFrame.call(this);
};

Window_CharEdit_Random.prototype.processOk = function() {
    if (this._randomHandler) {
        AudioManager.playStaticSe(MPPlugin.RandomSE);
        Input.update();
        TouchInput.update();
        this._randomHandler();
    }
};

//-----------------------------------------------------------------------------
// Scene_Boot

//29
Alias.ScBo_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    Alias.ScBo_loadSystemImages.call(this);
    ImageManager.reserveGeneGradients();
    ImageManager.reserveGenerator('TV', 'Male', 'TV_Body_p01');
    ImageManager.reserveGenerator('TV', 'Female', 'TV_Body_p01');
    if ($dataSystem.optSideView) {
        ImageManager.reserveGenerator('SV', 'Male', 'SV_body_p01');
        ImageManager.reserveGenerator('SV', 'Female', 'SV_body_p01');
    }
};

//-----------------------------------------------------------------------------
// Scene_File

//17
Alias.ScFi_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    ImageManager.createGeneCache();
    Alias.ScFi_create.call(this);
};

Alias.ScFi_terminate = Scene_File.prototype.terminate
Scene_File.prototype.terminate = function() {
    Alias.ScFi_terminate.call(this);
    ImageManager.deleteGeneCache();
};

//-----------------------------------------------------------------------------
// Scene_CharacterEdit

function Scene_CharacterEdit() {
    this.initialize.apply(this, arguments);
}

MPP.Scene_CharacterEdit = Scene_CharacterEdit;

Scene_CharacterEdit.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CharacterEdit.prototype.constructor = Scene_CharacterEdit;

Scene_CharacterEdit.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_CharacterEdit.prototype.prepare = function(tempActor) {
    this._tempActor = tempActor;
};
Scene_CharacterEdit.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._switchWindows = [];
    this.createRandomWindow();
    this.createCategoryWindow();
    this.createPartsWindow();
    this.createPreviewWindow();
    if (MPPlugin.EditColor) {
        this.createColorSlotWindow();
        this.createColorListWindow();
        this.createColorCustomWindow();
        this.createColorRgbWindow();
    }
};

Scene_CharacterEdit.prototype.updateActor = function() {
    Scene_MenuBase.prototype.updateActor.call(this);
    if (!this._tempActor) {
        this._tempActor = JsonEx.makeDeepCopy(this._actor);
        this._tempActor.initEquips([]);
    }
    this._tempActor.refreshImageName();
};

Scene_CharacterEdit.prototype.createRandomWindow = function() {
    this._randomWindow = new Window_CharEdit_Random();
    this._randomWindow.x = Graphics.boxWidth - this._randomWindow.width;
    this._randomWindow.y = Graphics.boxHeight - this._randomWindow.height;
    this._randomWindow._randomHandler = this.processRandom.bind(this);
    this.addWindow(this._randomWindow);
};

Scene_CharacterEdit.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_CharEdit_Category(32, 32, this._tempActor);
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onEditCancel.bind(this));
    this.addWindow(this._categoryWindow);
    this._switchWindows.push(this._categoryWindow);
};

Scene_CharacterEdit.prototype.createPartsWindow = function() {
    var wx = this._categoryWindow.x + this._categoryWindow.width;
    var wy = this._categoryWindow.y;
    this._partsWindow = new Window_CharEdit_PartsList(wx, wy, this._tempActor);
    this._partsWindow.setHandler('ok',        this.onPartsOk.bind(this));
    this._partsWindow.setHandler('keyCancel', this.onPartsCancel.bind(this));
    this._partsWindow.setHandler('cancel',    this.onEditCancel.bind(this));
    this.addWindow(this._partsWindow);
    this._categoryWindow.setPartsWindow(this._partsWindow);
    this._switchWindows.push(this._partsWindow);
};

Scene_CharacterEdit.prototype.createPreviewWindow = function() {
    var wx = this._partsWindow.x;
    this._previewWindow = new Window_CharEdit_Preview(wx, 0, this._tempActor);
    var window = this._categoryWindow;
    this._previewWindow.y = window.y + window.height - this._previewWindow.height;
    this.addWindow(this._previewWindow);
};

Scene_CharacterEdit.prototype.createColorSlotWindow = function() {
    var wx = this._partsWindow.x + this._partsWindow.width;
    var wy = this._partsWindow.y;
    var ww = Math.max(Graphics.boxWidth - wx - 32, 96);
    this._colorSlotWindow = new Window_CharEdit_ColorSlot(wx, wy, ww, this._tempActor);
    this._colorSlotWindow.setHandler('ok',        this.onColorSlotOk.bind(this));
    this._colorSlotWindow.setHandler('keyCancel', this.onColorSlotCancel.bind(this));
    this._colorSlotWindow.setHandler('cancel',    this.onEditCancel.bind(this));
    this.addWindow(this._colorSlotWindow);
    this._partsWindow.setColorWindow(this._colorSlotWindow);
    this._switchWindows.push(this._colorSlotWindow);
};

Scene_CharacterEdit.prototype.createColorListWindow = function() {
    this._colorListWindow = new Window_CharEdit_ColorList(this._tempActor);
    var wx = this._colorSlotWindow.x + this._colorSlotWindow.width - this._colorListWindow.width;
    this._colorListWindow.x = wx;
    this._colorListWindow.setHandler('ok',     this.onColorListOk.bind(this));
    this._colorListWindow.setHandler('cancel', this.onColorListCancel.bind(this));
    this.addWindow(this._colorListWindow);
};

Scene_CharacterEdit.prototype.createColorCustomWindow = function() {
    var wx = this._categoryWindow.x + this._categoryWindow.width;
    var wy = this._partsWindow.y + this._partsWindow.height;
    var ww = this._partsWindow.width + this._colorSlotWindow.width;
    this._colorCustomWindow = new Window_CharEdit_ColorCustom(wx, wy, ww, this._tempActor);
    this._colorCustomWindow.setHandler('ok',     this.onColorCustomOk.bind(this));
    this._colorCustomWindow.setHandler('cancel', this.onColorCustomCancel.bind(this));
    this.addWindow(this._colorCustomWindow);
};

Scene_CharacterEdit.prototype.createColorRgbWindow = function() {
    this._colorRgbWindow = new Window_CharEdit_ColorRgb(this._tempActor);
    this._colorRgbWindow.setHandler('ok',     this.onColorRgbOk.bind(this));
    this._colorRgbWindow.setHandler('cancel', this.onColorRgbCancel.bind(this));
    this._colorRgbWindow._customWindow = this._colorCustomWindow;
    this.addWindow(this._colorRgbWindow);
};

Scene_CharacterEdit.prototype.update = function() {
    this.updateWindowSwitch();
    Scene_Base.prototype.update.call(this);
    this.updateCallDebug();
};

Scene_CharacterEdit.prototype.updateWindowSwitch = function() {
    if (TouchInput.isTriggered()) {
        var windows = this._switchWindows;
        if (windows.some(function(window) { return window.active; })) {
            var touchWindow = null;
            for (var i = 0; i < windows.length; i++) {
                if (windows[i].isTouchedInsideFrame()) {
                    touchWindow = windows[i];
                }
            }
            if (touchWindow && !touchWindow.active) {
                for (var i = 0; i < windows.length; i++) {
                    if (windows[i] === touchWindow) {
                        windows[i].activate();
                    } else {
                        windows[i].deactivate();
                    }
                }
            }
        }
    }
};

Scene_CharacterEdit.prototype.updateCallDebug = function() {
    if (this.isDebugCalled()) {
        var text = "";
        text += '<geneDef Parts:' + this._tempActor._geneParts + '>\n';
        if (MPPlugin.EditColor) {
            var geneColors = this._tempActor._geneColors;
            for (var i = 0; i < 24; i++) {
                var index = geneColors[i * 10];
                var baseName = '<geneDef Color ' + (i + 1) + ':';
                if (index === -2) {
                    text += baseName + geneColors.slice(i * 10, i * 10 + 9) + '>\n';
                } else if (index >= 0) {
                    text += baseName + index + '>\n';
                }
            }
        }
        console.log(text);
    }
};

Scene_CharacterEdit.prototype.isDebugCalled = function() {
    return Input.isTriggered('debug') && $gameTemp.isPlaytest();
};

Scene_CharacterEdit.prototype.onEditCancel = function() {
    if (MPPlugin.ConfirmationScene &&
            (!this._actor._geneParts.equals(this._tempActor._geneParts) ||
            !this._actor._geneColors.equals(this._tempActor._geneColors))) {
        SceneManager.push(Scene_Confirm);
        SceneManager.prepareNextScene(this._tempActor);
    } else {
        this._actor._geneParts = this._tempActor._geneParts;
        this._actor._geneColors = this._tempActor._geneColors;
        this._actor.refreshImageName();
        this.popScene();
    }
};

Scene_CharacterEdit.prototype.onCategoryOk = function() {
    this._partsWindow.activate();
};

Scene_CharacterEdit.prototype.onPartsOk = function() {
    if (this._colorSlotWindow) {
        this._colorSlotWindow.activate();
    } else {
        this._categoryWindow.activate();
    }
};

Scene_CharacterEdit.prototype.onPartsCancel = function() {
    this._categoryWindow.activate();
};

Scene_CharacterEdit.prototype.onColorSlotOk = function() {
    this._colorListWindow.y = this._colorSlotWindow.currentBottomY();
    this._colorListWindow.setup(this._colorSlotWindow.currentExt());
    this._randomWindow.deactivate();
};

Scene_CharacterEdit.prototype.onColorSlotCancel = function() {
    this._partsWindow.activate();
};

Scene_CharacterEdit.prototype.onColorListOk = function() {
    if (this._colorListWindow.currentSymbol() === 'color') {
        this._colorSlotWindow.activate();
        this._colorSlotWindow.refresh();
        this._colorListWindow.close();
        this._randomWindow.activate();
    } else {
        this._colorListWindow.close();
        this._colorCustomWindow.setup(this._colorSlotWindow.currentExt());
    }
};

Scene_CharacterEdit.prototype.onColorListCancel = function() {
    this._colorSlotWindow.activate();
    this._colorSlotWindow.refresh();
    this._colorListWindow.close();
    this._randomWindow.activate();
};

Scene_CharacterEdit.prototype.onColorCustomOk = function() {
    var n1 = this._colorSlotWindow.currentExt();
    var n2 = this._colorCustomWindow.index();
    this._colorRgbWindow.setup(n1, n2);
};

Scene_CharacterEdit.prototype.onColorCustomCancel = function() {
    this._colorSlotWindow.activate();
    this._colorSlotWindow.refresh();
    this._colorCustomWindow.close();
    this._randomWindow.activate();
};

Scene_CharacterEdit.prototype.onColorRgbOk = function() {
    this._colorRgbWindow.setActorColor();
    this._colorCustomWindow.refresh();
    this._colorCustomWindow.activate();
    this._colorRgbWindow.close();
};

Scene_CharacterEdit.prototype.onColorRgbCancel = function() {
    this._colorCustomWindow.activate();
    this._colorRgbWindow.close();
};

Scene_CharacterEdit.prototype.processRandom = function() {
    var partsList = MPPlugin.RandomPartsList;
    var variation = $dataCharGene.Variation[this._tempActor._geneKind];
    for (var i = 0; i < partsList.length; i++) {
        var name = partsList[i];
        var list = variation[name];
        if (list && list.length > 0) {
            if (!MPPlugin.ForceParts.contains(name)) {
                list = list.clone();
                list.push(-1);
            }
            this._tempActor.setGeneParts(name, list[Math.randomInt(list.length)], true);
        }
    }
    if (MPPlugin.EditColor) {
        var colorList = MPPlugin.RandomColorList;
        for (var i = 0; i < colorList.length; i++) {
            var n = colorList[i];
            var start = Database.gradients[n * 2] || 0;
            var max = Database.gradients[n * 2 + 1] || 0;
            if (max > 0) {
                var c = Math.randomInt(max + 1);
                c = (c === max ? -1 : start + c);
                this._tempActor.setGeneColor(n, c);
            }
        }
    }
    this._tempActor.refreshImageName();
    this._partsWindow.selectParts();
    if (this._colorSlotWindow) this._colorSlotWindow.refresh();
};


//=============================================================================
// Scene_Confirm
//=============================================================================

//-----------------------------------------------------------------------------
// Window_Confirm

function Window_Confirm() {
    this.initialize.apply(this, arguments);
}

Window_Confirm.prototype = Object.create(Window_Base.prototype);
Window_Confirm.prototype.constructor = Window_Confirm;

Window_Confirm.prototype.initialize = function(y) {
    var x = -this.standardPadding();
    var width = Graphics.boxWidth + this.standardPadding() * 2;
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this.refresh();
    this.open();
};

Window_Confirm.prototype.standardPadding = function() {
    return 12;
};

Window_Confirm.prototype.refresh = function() {
    this.contents.clear();
    this.drawText(MPPlugin.text.Confirmation, 0, 0, this.contentsWidth(), 'center');
};

//-----------------------------------------------------------------------------
// Window_ConfirmCommand

function Window_ConfirmCommand() {
    this.initialize.apply(this, arguments);
}

Window_ConfirmCommand.prototype = Object.create(Window_Command.prototype);
Window_ConfirmCommand.prototype.constructor = Window_ConfirmCommand;

Window_ConfirmCommand.prototype.initialize = function(y) {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    Window_Command.prototype.initialize.call(this, x, y);
    this.openness = 0;
    this.open();
};

Window_ConfirmCommand.prototype.windowWidth = function() {
    return 0;
};

Window_ConfirmCommand.prototype.numVisibleRows = function() {
    return 3;
};

Window_ConfirmCommand.prototype.makeCommandList = function() {
    this.addCommand(MPPlugin.text.Yes, 'yes');
    this.addCommand(MPPlugin.text.No, 'no');
    this.addCommand(MPPlugin.text.Default, 'default');
};

Window_ConfirmCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_ConfirmCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    var widthMax = Math.max(this.textWidth(MPPlugin.text.Yes),
                        this.textWidth(MPPlugin.text.No),
                        this.textWidth(MPPlugin.text.Default));
    this.width = widthMax + (this.textPadding() + this.standardPadding()) * 2;
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};

//-----------------------------------------------------------------------------
// Scene_Confirm

function Scene_Confirm() {
    this.initialize.apply(this, arguments);
}

Scene_Confirm.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Confirm.prototype.constructor = Scene_Confirm;

Scene_Confirm.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Confirm.prototype.prepare = function(tempActor) {
    this._tempActor = tempActor;
};

Scene_Confirm.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createConfirmWindow();
    this.createCommandWindow();
    this.createPreviewWindow();
};

Scene_Confirm.prototype.createConfirmWindow = function() {
    this._confirmWindow = new Window_Confirm(192);
    this.addWindow(this._confirmWindow);
};

Scene_Confirm.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ConfirmCommand(256);
    this._commandWindow.setHandler('yes',     this.onCommandYes.bind(this));
    this._commandWindow.setHandler('no',      this.onCommandNo.bind(this));
    this._commandWindow.setHandler('default', this.onCommandDefault.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Confirm.prototype.createPreviewWindow = function() {
    this._previewWindow = new Window_CharEdit_Preview(0, 0, this._tempActor);
    this._previewWindow.x = (Graphics.boxWidth - this._previewWindow.width) / 2;
    this._previewWindow.y = 408;
    this.addWindow(this._previewWindow);
};

Scene_Confirm.prototype.onCommandYes = function() {
    this._actor._geneParts = this._tempActor._geneParts;
    this._actor._geneColors = this._tempActor._geneColors;
    this._actor.refreshImageName();
    SceneManager.goto(Scene_Map);
};

Scene_Confirm.prototype.onCommandNo = function() {
    this.popScene();
    SceneManager.prepareNextScene(this._tempActor);
};

Scene_Confirm.prototype.onCommandDefault = function() {
    this._tempActor._geneParts = this._actor._geneParts.clone();
    this._tempActor._geneColors = this._actor._geneColors.clone();
    //this._tempActor.refreshImageName();
    this.popScene();
    SceneManager.prepareNextScene(this._tempActor);
};




})(this);


//=============================================================================
// UpdateDrawer
//=============================================================================

(function() {

if (!Window_Base.Mpp_UpdateDrawer) {

var Alias = {};

//-----------------------------------------------------------------------------
// Window_Base

//13
Alias.WiBa_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function() {
    Alias.WiBa_initialize.apply(this, arguments);
    this._updateDrawers = [];
};

//105
Alias.WiBa_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    Alias.WiBa_update.apply(this, arguments);
    this.updateDrawer();
};

Window_Base.prototype.updateDrawer = function() {
    if (this.isOpen() && this.visible && this._updateDrawers.length > 0) {
        this._updateDrawers = this._updateDrawers.filter(function(process) {
            return process();
        });
    }
};

Window_Base.prototype.addUpdateDrawer = function(process) {
    this._updateDrawers.push(process);
};

Window_Base.prototype.clearUpdateDrawer = function() {
    this._updateDrawers = [];
};

Window_Base.Mpp_UpdateDrawer = true;
} //if (!Window_Base.MPP_UpdateDrawer)


})();
