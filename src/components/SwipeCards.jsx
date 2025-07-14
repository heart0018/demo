import { ArrowLeft, ExternalLink, Heart, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

// サンプルデータ
const sampleData = {
  eat: {
    洋食: [
      {
        id: 1,
        name: "ビストロ・ル・パリ",
        description: "本格フレンチが味わえる隠れた名店。シェフの繊細な技が光る",
        area: "関東",
        prefecture: "東京都",
        genre: "洋食",
        image_url:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        rating_count: 89,
        external_url: "https://maps.google.com",
        tags: ["フレンチ", "隠れ名店", "デート"],
      },
      {
        id: 2,
        name: "Italian Kitchen Marco",
        description:
          "ピザとパスタが絶品のカジュアルイタリアン。本場の味を気軽に",
        area: "関東",
        prefecture: "神奈川県",
        genre: "洋食",
        image_url:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 156,
        external_url: "https://maps.google.com",
        tags: ["イタリアン", "ピザ", "パスタ"],
      },
      {
        id: 3,
        name: "ステーキハウス 牛座",
        description: "厳選された黒毛和牛のステーキが味わえる高級レストラン",
        area: "関西",
        prefecture: "大阪府",
        genre: "洋食",
        image_url:
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 234,
        external_url: "https://maps.google.com",
        tags: ["ステーキ", "和牛", "高級"],
      },
      {
        id: 4,
        name: "カフェ・ド・パリ",
        description: "おしゃれな空間でフランス料理とワインが楽しめるビストロ",
        area: "中部",
        prefecture: "愛知県",
        genre: "洋食",
        image_url:
          "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 178,
        external_url: "https://maps.google.com",
        tags: ["ビストロ", "ワイン", "おしゃれ"],
      },
      {
        id: 5,
        name: "ドイツ料理 ラインハルト",
        description: "本場のソーセージとビールが楽しめるドイツ料理専門店",
        area: "九州沖縄",
        prefecture: "福岡県",
        genre: "洋食",
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
        rating: 4.1,
        rating_count: 92,
        external_url: "https://maps.google.com",
        tags: ["ドイツ料理", "ソーセージ", "ビール"],
      },
    ],
    和食: [
      {
        id: 6,
        name: "和食処 さくら",
        description: "季節の食材を使った会席料理。職人の技が光る伝統の味",
        area: "関東",
        prefecture: "東京都",
        genre: "和食",
        image_url:
          "https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 234,
        external_url: "https://maps.google.com",
        tags: ["会席", "季節料理", "接待"],
      },
      {
        id: 7,
        name: "寿司 鮨処 八幡",
        description:
          "新鮮な魚介を使った江戸前寿司。カウンターで職人の技を間近で",
        area: "関東",
        prefecture: "千葉県",
        genre: "和食",
        image_url:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        rating_count: 189,
        external_url: "https://maps.google.com",
        tags: ["寿司", "江戸前", "職人"],
      },
      {
        id: 8,
        name: "天ぷら まつい",
        description: "素材の味を活かした天ぷらが自慢。カラッと揚がった逸品",
        area: "関西",
        prefecture: "京都府",
        genre: "和食",
        image_url:
          "https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 156,
        external_url: "https://maps.google.com",
        tags: ["天ぷら", "素材", "職人"],
      },
      {
        id: 9,
        name: "蕎麦処 信州",
        description: "手打ちそばが味わえる老舗。風味豊かな蕎麦が絶品",
        area: "中部",
        prefecture: "長野県",
        genre: "和食",
        image_url:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 213,
        external_url: "https://maps.google.com",
        tags: ["蕎麦", "手打ち", "老舗"],
      },
      {
        id: 10,
        name: "うなぎ 川豊",
        description: "創業100年の老舗うなぎ店。秘伝のタレが自慢",
        area: "中国四国",
        prefecture: "広島県",
        genre: "和食",
        image_url:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 267,
        external_url: "https://maps.google.com",
        tags: ["うなぎ", "老舗", "秘伝"],
      },
    ],
    中華: [
      {
        id: 11,
        name: "中華料理 北京飯店",
        description: "本格四川料理が味わえる老舗中華料理店。麻婆豆腐が絶品",
        area: "関東",
        prefecture: "埼玉県",
        genre: "中華",
        image_url:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 178,
        external_url: "https://maps.google.com",
        tags: ["四川料理", "麻婆豆腐", "老舗"],
      },
      {
        id: 12,
        name: "広東料理 香港楼",
        description: "本場香港の味を再現した広東料理。点心が人気",
        area: "関西",
        prefecture: "兵庫県",
        genre: "中華",
        image_url:
          "https://images.unsplash.com/photo-1563379091544-d4e0b25ccd65?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 145,
        external_url: "https://maps.google.com",
        tags: ["広東料理", "点心", "香港"],
      },
      {
        id: 13,
        name: "上海料理 小籠包",
        description: "手作り小籠包が自慢の上海料理専門店。熱々のスープが絶品",
        area: "中部",
        prefecture: "静岡県",
        genre: "中華",
        image_url:
          "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 198,
        external_url: "https://maps.google.com",
        tags: ["上海料理", "小籠包", "手作り"],
      },
      {
        id: 14,
        name: "北京料理 故宮",
        description: "北京ダックが名物の高級中華料理店。皮のパリパリ感が絶品",
        area: "東北",
        prefecture: "宮城県",
        genre: "中華",
        image_url:
          "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 89,
        external_url: "https://maps.google.com",
        tags: ["北京料理", "北京ダック", "高級"],
      },
      {
        id: 15,
        name: "台湾料理 夜市",
        description: "台湾の夜市の味を再現。魯肉飯と台湾ラーメンが人気",
        area: "九州沖縄",
        prefecture: "鹿児島県",
        genre: "中華",
        image_url:
          "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        rating_count: 156,
        external_url: "https://maps.google.com",
        tags: ["台湾料理", "魯肉飯", "夜市"],
      },
    ],
  },
  outing: {
    relax: [
      {
        id: 16,
        name: "登別温泉 第一滝本館",
        description:
          "北海道屈指の温泉地。硫黄の香りと豊富な湯量が魅力の老舗温泉旅館",
        area: "北海道",
        prefecture: "北海道",
        genre: "温泉",
        image_url:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 342,
        external_url: "https://maps.google.com",
        tags: ["硫黄泉", "露天風呂", "老舗"],
      },
      {
        id: 17,
        name: "箱根温泉 湯の花",
        description:
          "絶景を望む露天風呂が自慢の温泉旅館。富士山を眺めながらの入浴は格別",
        area: "関東",
        prefecture: "神奈川県",
        genre: "温泉",
        image_url:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 312,
        external_url: "https://maps.google.com",
        tags: ["富士山", "露天風呂", "絶景"],
      },
      {
        id: 18,
        name: "有馬温泉 金の湯",
        description:
          "関西の奥座敷として親しまれる有馬温泉。金泉と銀泉の二つの泉質が楽しめる",
        area: "関西",
        prefecture: "兵庫県",
        genre: "温泉",
        image_url:
          "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 456,
        external_url: "https://maps.google.com",
        tags: ["金泉", "銀泉", "関西"],
      },
      {
        id: 19,
        name: "草津温泉 湯畑",
        description: "日本三大名湯の一つ。強酸性の温泉で美肌効果も期待できる",
        area: "関東",
        prefecture: "群馬県",
        genre: "温泉",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 289,
        external_url: "https://maps.google.com",
        tags: ["三大名湯", "強酸性", "美肌"],
      },
      {
        id: 20,
        name: "別府温泉 地獄めぐり",
        description:
          "世界有数の温泉地。色とりどりの地獄めぐりも楽しめる観光名所",
        area: "九州沖縄",
        prefecture: "大分県",
        genre: "温泉",
        image_url:
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 567,
        external_url: "https://maps.google.com",
        tags: ["地獄めぐり", "観光", "世界有数"],
      },
      {
        id: 21,
        name: "新宿御苑",
        description:
          "四季折々の花が楽しめる都心のオアシス。桜の名所としても有名",
        area: "関東",
        prefecture: "東京都",
        genre: "公園",
        image_url:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 1234,
        external_url: "https://maps.google.com",
        tags: ["桜", "都心", "オアシス"],
      },
      {
        id: 22,
        name: "奈良公園",
        description: "野生の鹿と触れ合える歴史ある公園。東大寺や春日大社も隣接",
        area: "関西",
        prefecture: "奈良県",
        genre: "公園",
        image_url:
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 892,
        external_url: "https://maps.google.com",
        tags: ["鹿", "歴史", "東大寺"],
      },
      {
        id: 23,
        name: "札幌サウナ 梅湯",
        description:
          "本格的なフィンランドサウナが楽しめる老舗銭湯。水風呂も充実",
        area: "北海道",
        prefecture: "北海道",
        genre: "サウナ",
        image_url:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        rating_count: 178,
        external_url: "https://maps.google.com",
        tags: ["フィンランド", "老舗", "水風呂"],
      },
      {
        id: 24,
        name: "コーヒー&ブックス",
        description: "静かな読書空間とこだわりのコーヒーが楽しめるブックカフェ",
        area: "中部",
        prefecture: "石川県",
        genre: "カフェ",
        image_url:
          "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 89,
        external_url: "https://maps.google.com",
        tags: ["読書", "コーヒー", "静か"],
      },
      {
        id: 25,
        name: "青森ねぶた散歩コース",
        description:
          "青森市内の歴史と文化を感じられる散歩コース。季節ごとに違った表情を見せる",
        area: "東北",
        prefecture: "青森県",
        genre: "散歩コース",
        image_url:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
        rating: 4.1,
        rating_count: 145,
        external_url: "https://maps.google.com",
        tags: ["歴史", "文化", "季節"],
      },
    ],
    play: [
      {
        id: 26,
        name: "ゲームパーク渋谷",
        description: "最新ゲームが楽しめる6フロア構成の大型ゲームセンター",
        area: "関東",
        prefecture: "東京都",
        genre: "ゲームセンター",
        image_url:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        rating: 4.1,
        rating_count: 456,
        external_url: "https://maps.google.com",
        tags: ["最新ゲーム", "大型", "6フロア"],
      },
      {
        id: 27,
        name: "ラウンドワン 大阪本店",
        description: "ボウリング、カラオケ、ビリヤードが一度に楽しめる複合施設",
        area: "関西",
        prefecture: "大阪府",
        genre: "ボウリング・カラオケ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 789,
        external_url: "https://maps.google.com",
        tags: ["ボウリング", "カラオケ", "複合施設"],
      },
      {
        id: 28,
        name: "リアル脱出ゲーム 名古屋",
        description: "話題の脱出ゲームが体験できる施設。チームワークが試される",
        area: "中部",
        prefecture: "愛知県",
        genre: "脱出ゲーム",
        image_url:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 234,
        external_url: "https://maps.google.com",
        tags: ["脱出ゲーム", "チームワーク", "話題"],
      },
      {
        id: 29,
        name: "バッティングドーム 仙台",
        description:
          "最新設備を備えたバッティングセンター。プロ並みの球速も体験可能",
        area: "東北",
        prefecture: "宮城県",
        genre: "バッティングセンター",
        image_url:
          "https://images.unsplash.com/photo-1544963150-b9c60d6b0c64?auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        rating_count: 156,
        external_url: "https://maps.google.com",
        tags: ["最新設備", "プロ並み", "球速"],
      },
      {
        id: 30,
        name: "シーシャカフェ アラビア",
        description:
          "本格的なシーシャが楽しめる中東風カフェ。様々なフレーバーを用意",
        area: "九州沖縄",
        prefecture: "福岡県",
        genre: "シーシャ",
        image_url:
          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80",
        rating: 4.0,
        rating_count: 89,
        external_url: "https://maps.google.com",
        tags: ["シーシャ", "中東風", "フレーバー"],
      },
      {
        id: 31,
        name: "大衆居酒屋 とりあえず",
        description: "昭和の雰囲気が残る老舗居酒屋。焼き鳥と生ビールが絶品",
        area: "関東",
        prefecture: "千葉県",
        genre: "飲み屋",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 267,
        external_url: "https://maps.google.com",
        tags: ["昭和", "焼き鳥", "生ビール"],
      },
      {
        id: 32,
        name: "VRパーク 札幌",
        description: "最新のVR技術を駆使したアトラクションが楽しめる施設",
        area: "北海道",
        prefecture: "北海道",
        genre: "VR",
        image_url:
          "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 134,
        external_url: "https://maps.google.com",
        tags: ["VR", "最新技術", "アトラクション"],
      },
      {
        id: 33,
        name: "ダーツバー エース",
        description: "プロ仕様のダーツボードが完備された本格ダーツバー",
        area: "中国四国",
        prefecture: "岡山県",
        genre: "ダーツバー",
        image_url:
          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80",
        rating: 4.1,
        rating_count: 98,
        external_url: "https://maps.google.com",
        tags: ["ダーツ", "プロ仕様", "本格"],
      },
    ],
  },
  rest: {
    drama: [
      {
        id: 34,
        name: "愛の不時着",
        description:
          "韓国ドラマの大ヒット作品。北朝鮮に不時着した財閥令嬢の恋愛を描く",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 89012,
        external_url: "https://netflix.com",
        tags: ["韓国ドラマ", "ロマンス", "話題作"],
      },
      {
        id: 35,
        name: "半沢直樹",
        description:
          "痛快サラリーマンドラマの金字塔。「倍返し」で有名な銀行員の活躍を描く",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 12340,
        external_url: "https://amazon.com/prime",
        tags: ["日本ドラマ", "サラリーマン", "痛快"],
      },
      {
        id: 36,
        name: "イカゲーム",
        description:
          "韓国発の世界的ヒット作品。サバイバルゲームの恐怖を描いたスリラー",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 156789,
        external_url: "https://netflix.com",
        tags: ["韓国ドラマ", "スリラー", "世界的"],
      },
      {
        id: 37,
        name: "逃げるは恥だが役に立つ",
        description:
          "契約結婚から始まる現代的な恋愛を描いた話題作。新垣結衣主演",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 23456,
        external_url: "https://amazon.com/prime",
        tags: ["日本ドラマ", "恋愛", "新垣結衣"],
      },
      {
        id: 38,
        name: "梨泰院クラス",
        description:
          "青春と復讐を描いた韓国ドラマ。夢に向かって突き進む若者たちの物語",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        rating_count: 67890,
        external_url: "https://netflix.com",
        tags: ["韓国ドラマ", "青春", "復讐"],
      },
      {
        id: 39,
        name: "今日から俺は!!",
        description:
          "80年代を舞台にしたヤンキー漫画の実写化。コメディ要素満載の青春ドラマ",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        rating_count: 34567,
        external_url: "https://amazon.com/prime",
        tags: ["日本ドラマ", "コメディ", "ヤンキー"],
      },
      {
        id: 40,
        name: "ストレンジャー・シングス",
        description: "80年代アメリカを舞台にした超自然現象を描くSFホラー",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 234567,
        external_url: "https://netflix.com",
        tags: ["アメリカ", "SF", "ホラー"],
      },
      {
        id: 41,
        name: "ドクターX",
        description:
          "天才外科医・大門未知子の活躍を描く医療ドラマ。「私、失敗しないので」",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 45678,
        external_url: "https://amazon.com/prime",
        tags: ["日本ドラマ", "医療", "天才"],
      },
      {
        id: 42,
        name: "ゲーム・オブ・スローンズ",
        description:
          "中世ファンタジー世界を舞台にした壮大な権力闘争を描く海外ドラマ",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 345678,
        external_url: "https://netflix.com",
        tags: ["ファンタジー", "権力闘争", "壮大"],
      },
      {
        id: 43,
        name: "おっさんずラブ",
        description:
          "おじさん同士の恋愛を描いたコメディドラマ。LGBTQをテーマにした話題作",
        area: "全国",
        prefecture: "全国",
        genre: "ドラマ",
        image_url:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        rating_count: 23456,
        external_url: "https://amazon.com/prime",
        tags: ["日本ドラマ", "コメディ", "LGBTQ"],
      },
    ],
    anime: [
      {
        id: 44,
        name: "鬼滅の刃",
        description: "大正時代を舞台にした鬼と鬼狩りの戦いを描く人気アニメ",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        rating_count: 345678,
        external_url: "https://amazon.com/prime",
        tags: ["バトル", "大正時代", "感動"],
      },
      {
        id: 45,
        name: "SPY×FAMILY",
        description: "スパイファミリーの日常を描いたハートフルコメディアニメ",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 234567,
        external_url: "https://netflix.com",
        tags: ["コメディ", "家族", "スパイ"],
      },
      {
        id: 46,
        name: "呪術廻戦",
        description: "呪術師と呪霊の戦いを描くダークファンタジーアニメ",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 189012,
        external_url: "https://amazon.com/prime",
        tags: ["ダークファンタジー", "呪術", "バトル"],
      },
      {
        id: 47,
        name: "アタック・オン・タイタン",
        description: "巨人と人類の壮絶な戦いを描いたダークファンタジー",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 456789,
        external_url: "https://netflix.com",
        tags: ["ダークファンタジー", "巨人", "戦い"],
      },
      {
        id: 48,
        name: "ワンピース",
        description: "海賊王を目指す少年ルフィの冒険を描く長編アニメ",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 567890,
        external_url: "https://amazon.com/prime",
        tags: ["海賊", "冒険", "友情"],
      },
      {
        id: 49,
        name: "ナルト",
        description: "忍者の世界を舞台にした少年の成長物語",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        rating_count: 234567,
        external_url: "https://netflix.com",
        tags: ["忍者", "成長", "友情"],
      },
      {
        id: 50,
        name: "ドラゴンボール",
        description: "7つのドラゴンボールを集める孫悟空の冒険物語",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        rating_count: 678901,
        external_url: "https://amazon.com/prime",
        tags: ["バトル", "冒険", "伝説"],
      },
      {
        id: 51,
        name: "ジブリ映画 となりのトトロ",
        description: "宮崎駿監督による心温まる家族アニメの名作",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        rating_count: 123456,
        external_url: "https://netflix.com",
        tags: ["ジブリ", "家族", "名作"],
      },
      {
        id: 52,
        name: "君の名は。",
        description: "新海誠監督による美しい映像と感動的な物語のアニメ映画",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        rating_count: 234567,
        external_url: "https://amazon.com/prime",
        tags: ["新海誠", "感動", "美しい"],
      },
      {
        id: 53,
        name: "ドラえもん",
        description:
          "未来からやってきた猫型ロボットと少年の日常を描く国民的アニメ",
        area: "全国",
        prefecture: "全国",
        genre: "アニメ",
        image_url:
          "https://images.unsplash.com/photo-1489599006549-f8e4b2d8f9d8?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        rating_count: 345678,
        external_url: "https://netflix.com",
        tags: ["国民的", "ロボット", "日常"],
      },
    ],
  },
};

export default function SwipeCards() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToLiked, addToLater } = useUser();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const category = searchParams.get("category");
    const mood = searchParams.get("mood");
    const genre = searchParams.get("genre");

    let cardsData = [];

    if (category === "eat") {
      // 食べる/飲むカテゴリのデータを統合
      cardsData = [
        ...sampleData.eat.洋食,
        ...sampleData.eat.和食,
        ...sampleData.eat.中華,
      ];
    } else if (category === "outing") {
      if (mood === "relax" || genre === "relax") {
        cardsData = sampleData.outing.relax;
      } else if (mood === "play" || genre === "play") {
        cardsData = sampleData.outing.play;
      } else {
        // 「どっちも！」の場合、両方のデータを混在
        cardsData = [...sampleData.outing.relax, ...sampleData.outing.play];
      }
    } else if (category === "rest") {
      if (genre === "drama") {
        cardsData = sampleData.rest.drama;
      } else if (genre === "anime") {
        cardsData = sampleData.rest.anime;
      } else if (genre === "all-media") {
        // 「全て」の場合、両方のデータを混在
        cardsData = [...sampleData.rest.drama, ...sampleData.rest.anime];
      }
    }

    // データをシャッフルしてランダム性を追加
    const shuffledData = cardsData.sort(() => Math.random() - 0.5);
    setCards(shuffledData);
    setCurrentIndex(0);
  }, [searchParams]);

  const handleLike = useCallback(() => {
    if (currentIndex < cards.length) {
      addToLiked(cards[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, cards, addToLiked]);

  const handlePass = useCallback(() => {
    if (currentIndex < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, cards.length]);

  const handleLater = () => {
    if (currentIndex < cards.length) {
      addToLater(cards[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonClick = (action, e) => {
    // ボタンクリック時はスワイプを無効化
    e.stopPropagation();
    if (isDragging) {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    }
    action();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    // マウスイベントとタッチイベントを区別
    if (e.type === "mousedown") {
      setStartPos({ x: e.clientX, y: e.clientY });
    } else if (e.type === "touchstart" && e.touches.length > 0) {
      const touch = e.touches[0];
      setStartPos({ x: touch.clientX, y: touch.clientY });
    }
  };

  // グローバルイベントリスナーを追加してドラッグ中のイベントを処理
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;

      const threshold = 80; // モバイルでは少し小さく

      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          handleLike();
        } else {
          handlePass();
        }
      }

      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    };

    const handleGlobalTouchMove = (e) => {
      if (!isDragging || e.touches.length === 0) return;
      
      e.preventDefault(); // スクロールを防止

      const touch = e.touches[0];
      const deltaX = touch.clientX - startPos.x;
      const deltaY = touch.clientY - startPos.y;

      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleGlobalTouchEnd = (e) => {
      if (!isDragging) return;
      
      e.preventDefault(); // デフォルトの動作を防止

      const threshold = 80; // モバイルでは少し小さく

      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          handleLike();
        } else {
          handlePass();
        }
      }

      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      // タッチイベントはpassive: falseで追加してpreventDefaultを有効にする
      document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
      document.addEventListener("touchend", handleGlobalTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, startPos, dragOffset, handleLike, handlePass]);

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (cards.length === 0) {
    return (
      <div className="swipe-container">
        <header className="swipe-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="swipe-header-title">スワイプカード</h1>
        </header>
        <div className="loading-container">
          <p>データを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="swipe-container">
        <header className="swipe-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="swipe-header-title">完了</h1>
        </header>
        <div className="complete-container">
          <h2>全てのカードを見終わりました！</h2>
          <p>保存したアイテムは「履歴」から確認できます</p>
          <button className="home-button" onClick={handleBack}>
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="swipe-container">
      <header className="swipe-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="swipe-header-title">スワイプカード</h1>
        <span className="card-counter">
          {currentIndex + 1} / {cards.length}
        </span>
      </header>

      <div className="swipe-content">
        <div className="card-stack">
          {/* 次のカード（背景） */}
          {currentIndex + 1 < cards.length && (
            <div className="swipe-card card-background">
              <div className="card-image">
                <img
                  src={cards[currentIndex + 1].image_url}
                  alt={cards[currentIndex + 1].name}
                />
              </div>
            </div>
          )}

          {/* 現在のカード */}
          <div
            className={`swipe-card ${isDragging ? "dragging" : ""}`}
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
              opacity: isDragging ? 0.8 : 1,
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* スワイプインジケーター */}
            {dragOffset.x > 40 && (
              <div className="swipe-indicator like">LIKE</div>
            )}
            {dragOffset.x < -40 && (
              <div className="swipe-indicator nope">NOPE</div>
            )}

            <div className="card-image">
              <img src={currentCard.image_url} alt={currentCard.name} />
            </div>

            <div className="card-info">
              <h3 className="card-title">{currentCard.name}</h3>
              <p className="card-description">{currentCard.description}</p>

              <div className="card-meta">
                <div className="card-rating">
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">{currentCard.rating}</span>
                  <span className="rating-count">
                    ({currentCard.rating_count})
                  </span>
                </div>
                <div className="card-area">
                  {currentCard.area}
                  {currentCard.prefecture &&
                    currentCard.prefecture !== "全国" && (
                      <span className="card-prefecture">
                        ・{currentCard.prefecture}
                      </span>
                    )}
                </div>
              </div>

              <div className="card-tags">
                {currentCard.tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="swipe-actions">
            <button 
              className="action-button nope" 
              onClick={(e) => handleButtonClick(handlePass, e)}
            >
              <X size={24} />
            </button>

            <button 
              className="action-button later" 
              onClick={(e) => handleButtonClick(handleLater, e)}
            >
              後で
            </button>

            <button 
              className="action-button like" 
              onClick={(e) => handleButtonClick(handleLike, e)}
            >
              <Heart size={24} />
            </button>
          </div>

          {/* 外部リンクボタン */}
          <div className="external-actions">
            <button
              className="external-button"
              onClick={(e) => {
                e.stopPropagation();
                handleExternalLink(currentCard.external_url);
              }}
            >
              <ExternalLink size={20} />
              {currentCard.genre === "ドラマ" || currentCard.genre === "アニメ"
                ? "これを観る！"
                : "ここに行く！"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
