// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Community_Basic","status":true,"description":"基本的なパラメーターを設定するプラグインです。","parameters":{"cacheLimit":"20","screenWidth":"864","screenHeight":"1536","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"auto","alwaysDash":"on"}},
{"name":"AnotherNewGame","status":true,"description":"アナザーニューゲーム追加プラグイン","parameters":{"anotherDataList":"[\"{\\\"name\\\":\\\"更新履歴\\\",\\\"mapId\\\":\\\"4\\\",\\\"mapX\\\":\\\"1\\\",\\\"mapY\\\":\\\"1\\\",\\\"hidden\\\":\\\"false\\\",\\\"disable\\\":\\\"false\\\",\\\"addPosition\\\":\\\"0\\\",\\\"switchId\\\":\\\"0\\\",\\\"fileLoad\\\":\\\"false\\\",\\\"noFadeout\\\":\\\"false\\\"}\",\"{\\\"name\\\":\\\"クレジット\\\",\\\"mapId\\\":\\\"3\\\",\\\"mapX\\\":\\\"1\\\",\\\"mapY\\\":\\\"1\\\",\\\"hidden\\\":\\\"false\\\",\\\"disable\\\":\\\"false\\\",\\\"addPosition\\\":\\\"0\\\",\\\"switchId\\\":\\\"0\\\",\\\"fileLoad\\\":\\\"false\\\",\\\"noFadeout\\\":\\\"false\\\"}\",\"{\\\"name\\\":\\\"データの更新\\\",\\\"mapId\\\":\\\"9\\\",\\\"mapX\\\":\\\"1\\\",\\\"mapY\\\":\\\"1\\\",\\\"hidden\\\":\\\"false\\\",\\\"disable\\\":\\\"false\\\",\\\"addPosition\\\":\\\"0\\\",\\\"switchId\\\":\\\"0\\\",\\\"fileLoad\\\":\\\"false\\\",\\\"noFadeout\\\":\\\"false\\\"}\"]","manageNumber":""}},
{"name":"FileDownloader","status":true,"description":"ファイルダウンロードプラグイン","parameters":{"正常終了スイッチID":"1","異常終了スイッチID":"2","配布サイトURL":"https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/"}},
{"name":"MPP_ChoiceEX","status":true,"description":"【ver.3.11】選択肢の機能拡張","parameters":{"maxPageRow":"10","Disabled Index":"none","=== Command ===":"","Plugin Commands":"{\"ChoicePos\":\"ChoicePos\",\"ChoiceVariableId\":\"ChoiceVariableId\",\"ChoiceRect\":\"ChoiceRect\",\"ChoiceUnderMessage\":\"ChoiceUnderMessage\"}","Event Comment":"{\"ChoiceHelp\":\"選択肢ヘルプ\"}"}},
{"name":"CommonPopupCore","status":true,"description":"ver1.06/汎用的なポップアップの仕組みを提供するためのベースプラグインです。","parameters":{"Text Back Color":"rgba(0,0,0,0.6)","Text Back FileName":"popup_back%d"}},
{"name":"GetInformation","status":true,"description":"ver1.16/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。","parameters":{"Info Disable Switch Id":"0","Use Battle Info":"true","Use Rewards Info":"true","Info Pattern":"GrowUp","Info Font Size":"20","Info Count":"180","Info Delay":"20","Info MoveWait":"160","Info MoveFade":"10","Enable Out Move":"false","Info Position":"Up","Info Slide Action":"Down","Info Sup X":"0","Info Sup Y":"0","Info Width":"816","Gold Icon Index":"314","Actor Icon Start Index":"320","Reward Popup Delay":"0","Log Key":"menu","Log Max":"100","Log Row":"2","Log Reverse":"false","Menu Info Log Name":"","Battle Show List":"item,gold,exp,skill,params,level,abp,classLevel","Get Gold Text":"「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[24]手に入れた！","Lost Gold Text":"「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[2]失った・・・","Get Item Text":"「\\I[_icon]_name」 を\\C[24]手に入れた！\\n\\C[6]_desc1","Lost Item Text":"「\\I[_icon]_name」 を\\C[2]失った・・・\\n\\C[6]_desc1","Get Item Text Num":"「\\I[_icon]_name」 を\\C[14]_num個\\C[24]手に入れた！\\n\\C[6]_desc1","Lost Item Text Num":"「\\I[_icon]_name」を\\C[14]_num個\\C[2]失った・・・\\n\\C[6]_desc1","Get Skill Text":"_actorは「\\I[_icon]_name」 を\\C[24]覚えた！\\n\\C[6]_desc1","Lost Skill Text":"_actorは「\\I[_icon]_name」を \\C[2]忘れてしまった・・・\\n\\C[6]_desc1","Exp Up Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！","Exp Down Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・","Lv Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Lv Down Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・","Param Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Param Down Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・","Abp Up Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！","Abp Down Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・","Class Lv Up Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Class Lv Down Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・","Formation Lv Up Text":"\\C[4]_nameの熟練度\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Formation Lv Max Text":"\\C[4]_name\\C[0]を\\C[14]マスターした！"}},
{"name":"MPP_HiddenPassage","status":true,"description":"【ver.2.1】指定したリージョンIDのタイルをプレイヤーより上に表示させます。","parameters":{"Passable Upper Region Ids":"32","Impassable Upper Region Ids":"33","=== Command ===":"【コマンド関連】","Plugin Commands":"{\"SetPlayerZ\":\"SetPlayerZ\"}"}},
{"name":"BattleActorFaceVisibility","status":true,"description":"戦闘中顔グラフィック表示プラグイン","parameters":{"ウィンドウ表示":"ON","ウィンドウX座標":"","ウィンドウY座標":"","縮小表示":"ON","敵選択中は非表示":"OFF","味方選択中は対象表示":"ON","ウィンドウ透過":"OFF"}},
{"name":"ThroughFailedToLoad","status":true,"description":"ロード失敗エラーのすり抜けプラグイン","parameters":{"テストプレー時無効":"true","Web版で無効":"false","無視種別":"3"}},
{"name":"DP_MapZoom","status":true,"description":"マップの拡大率を制御します。","parameters":{"Base Scale":"2","Encount Effect":"true","Camera Controll":"true","Weather Patch":"true","Picture Size Fixation":"false","Old Focus":"false","Easing Function":"t"}},
{"name":"PictureCallCommon","status":true,"description":"ピクチャのボタン化プラグイン","parameters":{"透明色を考慮":"true","ピクチャ番号の変数番号":"0","ポインタX座標の変数番号":"0","ポインタY座標の変数番号":"0","タッチ操作抑制":"false","タッチ操作抑制スイッチ":"0","戦闘中常にコモン実行":"false","並列処理として実行":"false","無効スイッチ":"0"}},
{"name":"HIME_PreTitleEvents","status":true,"description":"Build your own sequence of events that should occur before\r\nthe title screen begins","parameters":{"Pre-Title Map ID":"1","Use As Title":"true"}},
{"name":"MOG_AnimatedText","status":true,"description":"(v1.3) マップ画面でテキストをアニメーション表示します。","parameters":{"Letter Space X-Axis":"0","Letter Space Y-Axis":"0"}},
{"name":"Torigoya_SaveCommand","status":true,"description":"プラグインコマンドからセーブを実行できるようにします。","parameters":{}},
{"name":"UTA_CommonSave","status":true,"description":"共有のセーブデータを作成し、指定したスイッチ・変数の状態をセーブデータ間で共有します。","parameters":{"Target Switches":"1","Target Variables":"","Is Auto":"true","Auto on Gameover":"false","Show Trace":"false"}},
{"name":"AdjustPictureGraphical","status":true,"description":"ピクチャのグラフィカルな位置調整プラグイン。\nパラメータを変更したら「プロジェクトの保存」（Ctrl+S）","parameters":{"グリッドサイズ":"48","テストマップID":"-1"}},
{"name":"111_InputForm","status":true,"description":"ゲーム画面上にHTMLの入力フォームを表示します","parameters":{"OK Button Text":"決定","Display Cancel Button":"1","Cancel Button Text":"キャンセル","Judge Switch Interval":"100","Switch ID Selected OK":"0","Force OK Switch ID":"0","Force Cancel Switch ID":"0"}},
{"name":"DTextPicture","status":true,"description":"動的文字列ピクチャ生成プラグイン","parameters":{"itemIconSwitchId":"0","lineSpacingVariableId":"0","frameWindowSkin":"","frameWindowPadding":"18","padCharacter":"0","prefixText":""}},
{"name":"ChangeMapTouchPolicy","status":true,"description":"マップタッチ仕様変更プラグイン","parameters":{"initPolicyLevel":"2","invalidForceDash":"false"}},
{"name":"Gacha","status":true,"description":"ランダムにアイテムを取得します。","parameters":{"Help Message Text":"1回Required Amount\\Gでガチャを引きます","Button Text":"ガチャを引く","Button Text 10 Time":"10連","Button Text All":"全額使う","Get Message Text":"GET Item Name","Show Item Description":"1","New Item Notice":"\\C[2]New!!\\C[0]","Effect":"119","Rank1 Effect":"-1","Rank2 Effect":"-1","Rank3 Effect":"-1","Rank4 Effect":"-1","Rank5 Effect":"-1","New Effect":"-1","ME":"Organ","Required Amount":"1000","Required Variable":"0","Cost Unit":"回","Effect Stop Switch":"0","SE":"Item3"}},
{"name":"GachaBook","status":true,"description":"ガチャアイテム一覧を表示します。","parameters":{"Unknown Data":"??????","Price Text":"Price","Equip Text":"Equip","Type Text":"Type","Rank Text":"Rank","Simple Display":"0"}},
{"name":"UR65_SmartPhoneUI","status":true,"description":"スマホ用UI  ver 1.0.0\nUIのサイズをスマートフォン向けに最適化します。","parameters":{"タイトル":"1","メニュー":"1","アイテム":"1","スキル":"1","装備":"1","オプション":"1","ゲーム終了":"1","戦闘":"1","ショップ":"1","イベント関係":"1","アイコン位置修正":"1"}},
{"name":"OnlineAvatar","status":false,"description":"Firebaseを使ってプレイヤーをオンライン同期します。","parameters":{"apiKey":"AIzaSyBMyonZv_Ha2JgYT9nwMrImfl2tBmetaRE","authDomain":"ios-asano-rpg.firebaseapp.com","databaseURL":"https://online-test-c2a10.firebaseio.com","avatarEvent":"20","syncSwitchStart":"21","syncSwitchEnd":"40","syncVariableStart":"21","syncVariableEnd":"40"}},
{"name":"TMNamePop","status":false,"description":"イベントの頭上に文字列を表示する機能を追加します。","parameters":{"backOpacity":"96","fontSize":"20","fontOutlineWidth":"4","fontOutlineColor":"rgba(0, 0, 0, 0.5)","width":"160","useRoundRect":"0","roundRectRadius":"6"}},
{"name":"Lunatlazur_ActorNameWindow","status":true,"description":"名前ウィンドウ表示プラグイン","parameters":{"テキストカラー":"3"}},
{"name":"MPP_CharacterMake","status":true,"description":"【ver.1.7】ゲーム内でキャラクター生成を行えます。","parameters":{"=== Basic ===":"【基本的な設定】","Edit Color?":"true","Parts List":"[\"Face\",\"FrontHair\",\"RearHair\",\"Beard\",\"Ears\",\"Eyes\",\"Eyebrows\",\"Nose\",\"Mouth\",\"FacialMark\",\"BeastEars\",\"Tail\",\"Wing\",\"Clothing\",\"Cloak\",\"AccA\",\"AccB\",\"Glasses\"]","Preview List":"FG,TV,SV","Force Parts":"[\"Face\",\"Ears\",\"Eyes\",\"Eyebrows\",\"Nose\",\"Mouth\"]","Confirmation Scene?":"true","=== Random ===":"【ランダム生成】","Random Text":"Shift:  ランダム","Random Parts List":"[\"Face\",\"FrontHair\",\"RearHair\",\"Beard\",\"Ears\",\"Eyes\",\"Eyebrows\",\"Nose\",\"Mouth\",\"FacialMark\",\"Clothing\",\"AccA\",\"AccB\",\"Glasses\"]","Random Color List":"3,7,8","Random SE":"{\"Name\":\"Decision1\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Random Background Type":"0","=== Terms ===":"【用語】","Command":"{\"Yes\":\"はい\",\"No\":\"いいえ\",\"Default\":\"元に戻す\",\"Ok\":\"決定\",\"Custom\":\"カスタム\",\"Bright\":\"ブライト\",\"Normal\":\"ノーマル\",\"Dark\":\"ダーク\"}","Message":"{\"Confirmation\":\"このグラフィックでよろしいですか？\",\"Loading\":\"Loading\"}","Base Kind":"{\"Male\":\"男性\",\"Female\":\"女性\",\"Kid\":\"子ども\"}","Parts":"{\"Face\":\"顔\",\"FrontHair\":\"前髪\",\"RearHair\":\"後髪\",\"Beard\":\"ヒゲ\",\"Ears\":\"耳\",\"Eyes\":\"目\",\"Eyebrows\":\"眉\",\"Nose\":\"鼻\",\"Mouth\":\"口\",\"FacialMark\":\"紋様\",\"BeastEars\":\"獣耳\",\"Tail\":\"尻尾\",\"Wing\":\"羽\",\"Clothing\":\"服\",\"Cloak\":\"マント\",\"AccA\":\"装身具1\",\"AccB\":\"装身具2\",\"Glasses\":\"メガネ\"}","Colors":"{\"Color1\":\"肌の色\",\"Color2\":\"目の色\",\"Color3\":\"毛の色\",\"Color4\":\"サブカラー\",\"Color5\":\"紋様の色\",\"Color6\":\"獣耳の色\",\"Color7\":\"メインカラー\",\"Color8\":\"サブカラー1\",\"Color9\":\"サブカラー2\",\"Color10\":\"サブカラー3\",\"Color11\":\"メインカラー\",\"Color12\":\"サブカラー1\",\"Color13\":\"メインカラー\",\"Color14\":\"サブカラー1\",\"Color15\":\"サブカラー2\",\"Color16\":\"メインカラー\",\"Color17\":\"サブカラー1\",\"Color18\":\"サブカラー2\",\"Color19\":\"サブカラー3\",\"Color20\":\"メインカラー\",\"Color21\":\"サブカラー1\",\"Color22\":\"サブカラー2\",\"Color23\":\"尻尾の色\",\"Color24\":\"羽の色\"}","=== Advanced ===":"【高度な設定】","Manual Color Indexs":"[\"{\\\"RGB\\\":\\\"255,235,157\\\",\\\"ColorIndex\\\":\\\"17\\\"}\",\"{\\\"RGB\\\":\\\"255,207,23\\\",\\\"ColorIndex\\\":\\\"17\\\"}\"]","=== Command ===":"【コマンド関連】","Plugin Commands":"{\"SetCharGeneBaseKind\":\"SetCharGeneBaseKind\",\"SetCharGeneDamage\":\"SetCharGeneDamage\",\"StartCharEdit\":\"StartCharEdit\"}"}},
{"name":"GeoManager","status":true,"description":"位置情報を取得、距離計算をするモジュール","parameters":{"Type":"WGS84"}},
{"name":"GeoLogger","status":true,"description":"「ジオマネージャー」 モジュールのデモ用プラグイン「ジオロガー」\nインターバルタイマーでログ取得します。移動距離を記録して、出力してくれます。","parameters":{"Unit":"'m'","HighAccuracy":"true","MaximumAge":"0","Timeout":"10000","Interval":"10"}}
];
