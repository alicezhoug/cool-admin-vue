<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />

			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索关键字" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" >
				<template #column-lastMsgContent="{scope}">
					<el-text v-if="scope.row.lastMsgType==0">{{ scope.row.lastMsgContent}}</el-text>
					<el-avatar v-if="scope.row.lastMsgType==1" :src="scope.row.lastMsgContent"/>
				</template>

				<template #slot-sellbtn="{ scope }">
					<el-button size="small"  type="danger" @click="openChatDetail(scope.row)">聊天详情</el-button>
				</template>

			</cl-table>

		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>

	<!-- 渠道参数配置 -->
	<chat :ref="setRefs('chat')" />

</template>

<script lang="ts" name="imchat-session" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";

import chat from "../../chat/components/index.vue";


import { useCool } from "/@/cool";
import { useDict } from "/$/dict";

const { service,setRefs ,refs} = useCool();

const { dict } = useDict();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "发送方UID",
			prop: "fromUserId",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "接收方UID",
			prop: "toUserId",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "接收方未读数",
			prop: "toNotReadCount",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "发送方未读数",
			prop: "fromNotReadCount",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "最后消息类型",
			prop: "lastMsgType",
			component: { name: "el-radio-group", options: dict.get('msgType') },
		},
		{
			label: "最后消息内容",
			prop: "lastMsgContent",
			component: { name: "el-input", props: { clearable: true } }
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "发送方UID", prop: "fromUserId", minWidth: 140 },
		{ label: "发送方昵称", prop: "fromUserNickname", minWidth: 150 },
		{ label: "接收方UID", prop: "toUserId", minWidth: 140 },
		{ label: "接收方昵称", prop: "toUserNickname", minWidth: 150 },
		{ label: "接收方未读数", prop: "toNotReadCount", minWidth: 140 },
		{ label: "发出方未读数", prop: "fromNotReadCount", minWidth: 140 },
		{
			label: "最后消息类型",
			prop: "lastMsgType",
			dict: dict.get('msgType'),
			dictColor: true,
			minWidth: 150
		},
		{ label: "最后消息内容", prop: "lastMsgContent", minWidth: 400 },
		{ type: "op", width:200, buttons: ["slot-sellbtn"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.imchat.session
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
// 打开聊天详情
function openChatDetail(row:any){
	refs.chat.open();
}
</script>
