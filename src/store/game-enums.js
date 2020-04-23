const gameEnums = {
    "1": {
        "key": "OK",
        "label": "OK"
    },
    "100": {
        "key": "VICTORY_MODE_UNKNOWN",
        "label": "未知胜利模式"
    },
    "101": {
        "key": "VICTORY_MODE_KILL_GROUP",
        "label": "屠边"
    },
    "102": {
        "key": "VICTORY_MODE_KILL_ALL",
        "label": "屠城"
    },
    "200": {
        "key": "CAPTAIN_MODE_UNKNOWN",
        "label": "未知警长模式"
    },
    "201": {
        "key": "CAPTAIN_MODE_WITH_CAPTAIN",
        "label": "有警长"
    },
    "202": {
        "key": "CAPTAIN_MODE_WITHOUT_CAPTAIN",
        "label": "没有警长"
    },
    "300": {
        "key": "WITCH_MODE_UNKNOWN",
        "label": "未知女巫模式"
    },
    "301": {
        "key": "WITCH_MODE_CAN_SAVE_SELF",
        "label": "全程可以自救"
    },
    "302": {
        "key": "WITCH_MODE_FIRST_NIGHT_ONLY",
        "label": "仅首夜可以自救"
    },
    "303": {
        "key": "WITCH_MODE_CANNOT_SAVE_SELF",
        "label": "全程不可自救"
    },
    "400": {
        "key": "ROLE_TYPE_UNKNOWN",
        "label": "未知角色"
    },
    "401": {
        "key": "ROLE_TYPE_SEER",
        "label": "预言家"
    },
    "402": {
        "key": "ROLE_TYPE_HUNTER",
        "label": "猎人"
    },
    "403": {
        "key": "ROLE_TYPE_CUPID",
        "label": "丘比特"
    },
    "404": {
        "key": "ROLE_TYPE_WITCH",
        "label": "女巫"
    },
    "405": {
        "key": "ROLE_TYPE_LITTLE_GIRL",
        "label": "小女孩"
    },
    "406": {
        "key": "ROLE_TYPE_THIEF",
        "label": "盗贼"
    },
    "407": {
        "key": "ROLE_TYPE_VILLAGER",
        "label": "普通村民"
    },
    "408": {
        "key": "ROLE_TYPE_NORMAL_WOLF",
        "label": "普通狼人"
    },
    "409": {
        "key": "ROLE_TYPE_IDIOT",
        "label": "白痴"
    },
    "410": {
        "key": "ROLE_TYPE_ANCIENT",
        "label": "长老"
    },
    "411": {
        "key": "ROLE_TYPE_SCAPEGOAT",
        "label": "替罪羊"
    },
    "412": {
        "key": "ROLE_TYPE_SAVIOR",
        "label": "守卫"
    },
    "413": {
        "key": "ROLE_TYPE_PIPER",
        "label": "吹笛者"
    },
    "414": {
        "key": "ROLE_TYPE_WHITE_WOLF",
        "label": "白狼王"
    },
    "415": {
        "key": "ROLE_TYPE_RAVEN",
        "label": "乌鸦"
    },
    "416": {
        "key": "ROLE_TYPE_PYROMANIAC",
        "label": "火狼"
    },
    "417": {
        "key": "ROLE_TYPE_TWO_SISTERS",
        "label": "两姐妹"
    },
    "418": {
        "key": "ROLE_TYPE_THREE_BROTHERS",
        "label": "三兄弟"
    },
    "419": {
        "key": "ROLE_TYPE_ANGEL",
        "label": "天使"
    },
    "500": {
        "key": "GROUP_TYPE_UNKNOWN",
        "label": "未知阵营"
    },
    "501": {
        "key": "GROUP_TYPE_WOLVES",
        "label": "狼人阵营"
    },
    "502": {
        "key": "GROUP_TYPE_GODS",
        "label": "神阵营"
    },
    "503": {
        "key": "GROUP_TYPE_VILLAGERS",
        "label": "民阵营"
    },
    "504": {
        "key": "GROUP_TYPE_THIRD_PARTY",
        "label": "第三方势力"
    },
    "600": {
        "key": "TURN_STEP_UNKNOWN",
        "label": "未知阶段"
    },
    "601": {
        "key": "TURN_STEP_DEAL",
        "label": "发牌"
    },
    "602": {
        "key": "TURN_STEP_TURN_NIGHT",
        "label": "入夜"
    },
    "603": {
        "key": "TURN_STEP_TURN_DAY",
        "label": "天亮"
    },
    "604": {
        "key": "TURN_STEP_ELECT",
        "label": "竞选"
    },
    "605": {
        "key": "TURN_STEP_ELECT_TALK",
        "label": "竞选发言"
    },
    "606": {
        "key": "TURN_STEP_ELECT_VOTE",
        "label": "竞选投票"
    },
    "607": {
        "key": "TURN_STEP_ELECT_PK_TALK",
        "label": "竞选PK发言"
    },
    "608": {
        "key": "TURN_STEP_ELECT_PK_VOTE",
        "label": "竞选PK投票"
    },
    "609": {
        "key": "TURN_STEP_TALK",
        "label": "发言"
    },
    "610": {
        "key": "TURN_STEP_VOTE",
        "label": "投票"
    },
    "611": {
        "key": "TURN_STEP_PK_TALK",
        "label": "PK发言"
    },
    "612": {
        "key": "TURN_STEP_PK_VOTE",
        "label": "PK投票"
    },
    "613": {
        "key": "TURN_STEP_ANNOUNCE",
        "label": "公布结果"
    },
    "614": {
        "key": "TURN_STEP_LAST_WORDS",
        "label": "遗言"
    },
    "700": {
        "key": "GAME_MESSAGE_GAME_NOT_EXIST",
        "label": "房间不存在"
    },
    "701": {
        "key": "GAME_MESSAGE_GAME_FULL",
        "label": "房间已满"
    },
    "702": {
        "key": "GAME_MESSAGE_ALREADY_IN",
        "label": "你已在游戏中"
    },
    "703": {
        "key": "GAME_MESSAGE_ROLE_NOT_EXIST",
        "label": "角色不存在"
    },
    "704": {
        "key": "GAME_MESSAGE_NOT_IN_GAME",
        "label": "你不在游戏中"
    },
    "705": {
        "key": "GAME_MESSAGE_CANNOT_START",
        "label": "玩家不足，无法开始"
    },
    "706": {
        "key": "GAME_MESSAGE_UNKNOWN_OP",
        "label": "未知命令"
    },
    "708": {
        "key": "GAME_MESSAGE_ALREADY_STARTED",
        "label": "游戏已经开始了"
    },
    "709": {
        "key": "GAME_MESSAGE_POSITION_OCCUPIED",
        "label": "那个位置已经有人了"
    },
    "710": {
        "key": "GAME_MESSAGE_CANNOT_ACT",
        "label": "当前无法操作"
    },
    "711": {
        "key": "GAME_MESSAGE_WRONG_PASSWORD",
        "label": "用户名或密码错误"
    },
    "712": {
        "key": "GAME_MESSAGE_USER_EXISTS",
        "label": "用户名已存在"
    },
    "713": {
        "key": "GAME_MESSAGE_NOT_VOTED_YET",
        "label": "仍有玩家未投票：{}"
    },
    "800": {
        "key": "SKILL_VOTE",
        "label": "投票"
    },
    "801": {
        "key": "SKILL_WOLF_KILL",
        "label": "狼刀"
    },
    "802": {
        "key": "SKILL_DISCOVER",
        "label": "查验"
    },
    "803": {
        "key": "SKILL_WITCH",
        "label": "用药"
    },
    "804": {
        "key": "SKILL_GUARD",
        "label": "守护"
    },
    "805": {
        "key": "SKILL_SHOOT",
        "label": "开枪"
    },
    "806": {
        "key": "SKILL_SUICIDE",
        "label": "自爆"
    },
    "807": {
        "key": "SKILL_TOXIC",
        "label": "毒杀"
    },
    "808": {
        "key": "SKILL_CAPTAIN",
        "label": "警长相关"
    },
    "900": {
        "key": "TAG_ELECT",
        "label": "上警"
    },
    "901": {
        "key": "TAG_NOT_ELECT",
        "label": "不上警"
    },
    "902": {
        "key": "TAG_GIVE_UP_ELECT",
        "label": "退水"
    },
    "1000": {
        "key": "WOLF_MODE_FIRST",
        "label": "第一狼刀有效"
    },
    "1001": {
        "key": "WOLF_MODE_ALL",
        "label": "所有狼刀相同有效"
    },
    "1100": {
        "key": "TAG_ATTACKABLE_WOLF",
        "label": "带刀狼"
    },
    "1200": {
        "key": "STEP_FLAG_AUTO_MOVE_ON",
        "label": "自动下一步"
    },
    "1201": {
        "key": "STEP_FLAG_WAIT_FOR_ACTION",
        "label": "等待玩家操作"
    },
    "1300": {
        "key": "GAME_TIMEOUT_RANDOM_FROM",
        "label": 12
    },
    "1301": {
        "key": "GAME_TIMEOUT_RANDOM_TO",
        "label": 15
    },
    "1400": {
        "key": "GAME_STATUS_UNKNOWN",
        "label": "未知状态"
    },
    "1401": {
        "key": "GAME_STATUS_WAIT_TO_START",
        "label": "等待开始"
    },
    "1402": {
        "key": "GAME_STATUS_READY",
        "label": "游戏已准备好"
    },
    "1403": {
        "key": "GAME_STATUS_DAY",
        "label": "白天"
    },
    "1404": {
        "key": "GAME_STATUS_NIGHT",
        "label": "夜晚"
    },
    "-2": {
        "key": "TARGET_NOT_ACTED",
        "label": "未行动"
    },
    "-1": {
        "key": "TARGET_NO_ONE",
        "label": "无目标"
    }
};

export default gameEnums;