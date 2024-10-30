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
			<!-- 关键字搜索
			<cl-search-key placeholder="搜索关键字" />
			-->
			<!--【很重要】搜索组件 -->
			<cl-search ref="Search" :reset-btn="true" />

			<!-- 高级搜索 -->
			<cl-adv-btn />

		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" >
				<template #column-albumUrls="{scope}">
					<el-avatar v-if="scope.row.albumUrls" :src="scope.row.albumUrls[0]"/>
				</template>





				<template #slot-sellbtn="{ scope }">
					<el-button size="small"  type="danger" @click="openSell(scope.row)">服务价格</el-button>
				</template>

			</cl-table>

		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 弹窗 -->
		<cl-adv-search ref="AdvSearch" />

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
	<!-- 渠道参数配置 -->
	<sell :ref="setRefs('sell')" />


</template>

<script lang="ts" name="phoenix-girl" setup>
import { useCrud, useTable, useUpsert,useSearch,useAdvSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useDict } from "/$/dict";
import { reactive } from "vue";

import sell from "./sell.vue";


const { dict } = useDict();

const { service ,refs, setRefs} = useCool();


const options=reactive({
	yesNo:[
		{
			label:"是",
			value:true,
			type: "success"
		},
		{
			label:"否",
			value:false,
			type:"danger"
		}
	]
});


// cl-upsert
const Upsert = useUpsert({

	items: [
		{
				//【很重要】必须为 tabs
				type: "tabs",
				props: {
					// 分组样式
					type: "card",
					// 分组列表，必须是 { label, value } 的数组格式
					labels: [
						{
							label: "基础信息", // 标题
							value: "base" // 唯一标识
						},
						{
							label: "个人简介",
							value: "persionInfo"
						}
					]
				}
		},

		{
			group: "base", // 标识
			prop: "albumUrls",
			label: "照片或视频",
			required: true,
			component: {
				name: "cl-upload",
				props: {
					text: "选择照片或视频",
					multiple:true,
					type:'file'
				}
			}
		},
		{
			group: "base", // 标识
			prop: "locationUrl",
			label: "工作位置",
			component: {
				name: "cl-upload",
				props: {
					text: "选择照片",
					multiple:true,
					type:'file'
				}
			}
		},
		{
			group: "base", // 标识
			label: "工作区域",
			prop: "provinceCityDistrict",
			span: 15,
			component: {
				name: "cl-select",
				props:{
					tree: true,
					checkStrictly: false,
					options: dict.get('province')
				}
			},
			required: true
		},
		{ label: "是否在线",group: "base", value: true, prop: "online",span: 9, flex: false, component: { name: "cl-switch"} },
		{
			group: "base", // 标识
			label: "服务方式",
			prop: "serviceMode",

			span: 15,
			component: {
				name: "el-checkbox-group" ,

				options: dict.get("serviceMode"),

			},
			required: true
		},
		{
			group: "base", // 标识
			label: "等级",
			prop: "leveSortation",
			hook: "number",
			span: 9,
			component: { name: "el-select" ,options: dict.get('leveSortation')},
			required: true
		},
		{
			group:"base",
			label: "工作地址",
			prop: "address",
			span: 15,
			component: { name: "el-input", props: { clearable: true } },
		},

		{ label: "是否推荐",group: "base", value: false, prop: "recommend",span: 9, flex: false, component: { name: "cl-switch"} },

		{ label: "关联帐号ID",group: "base",  prop: "refUserId",span: 15, flex: false, component: { name: "el-input" }},




		{
			group:"persionInfo",
			label: "艺名",
			prop: "nickName",
			span: 8,
			component: { name: "el-input", props: { clearable: true } },
		},
		{ group:"persionInfo",label: "年龄", span: 8,prop: "age", hook: "number",  component: { name: "el-input-number" } },
		{
			group:"persionInfo",
			label: "籍贯",
			prop: "nativePlace",
			span: 8,
			component: { name: "el-select",options:dict.get('province'), props: { clearable: true } }
		},
		{
			group:"persionInfo",
			label: "身高(CM)",
			prop: "height",
			hook: "number",
			span: 8,
			component: { name: "el-input-number" }
		},
		{
			group:"persionInfo",
			label: "体重(KG)",
			prop: "weight",
			hook: "number",
			span: 8,
			component: { name: "el-input-number" }
		},
		{   group:"persionInfo",
			label: "胸围",
			prop: "bust",
			span: 8,
			component: { name: "el-input", props: { clearable: true,placeholder:"例如:34C" }}
		 },
		{
			group:"persionInfo",
			label: "简介",
			prop: "intro",

			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		},
		{
			group:"persionInfo",
			label: "温馨提示",
			prop: "tips",
			component: { name: "el-input", props: { type: "textarea", rows: 2  } }
		},
		{
			group:"persionInfo",
			label: "工作性质",
			prop: "workNature",
			hook: "number",
			span: 8,
			component: { name: "el-select" ,options:dict.get('workNature')},
		},

		{
			group:"persionInfo",
			label: "职业",
			prop: "career",
			hook: "number",
			span: 8,
			component: { name: "el-select" ,options:dict.get('career')},
		},


		{
			group:"persionInfo",
			label: "所属国家",
			prop: "country",
			span: 8,
			component: { name: "el-select",options:dict.get('country'), props: { clearable: true } }
		},
		{
			group:"persionInfo",
			label: "工作开始时间",
			prop: "workBegin",
			span: 12,
			component: {
				name: "el-time-picker"
			}
		},
		{
			group:"persionInfo",
			label: "工作结束时间",
			prop: "workEnd",
			span: 12,
			component: {
				name: "el-time-picker"
			}
		},




	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: "省市区",
			prop: "provinceCityDistrict",
			minWidth: 150,
			dict:dict.get("province")
		},
		{ label: "工作地址", prop: "address", minWidth: 140 },
		{ label: "图片或视频", prop: "albumUrls", minWidth: 140},
		{ label: "等级", prop: "leveSortation", minWidth: 140,dict:  dict.get('leveSortation'), },

		{ label: "价格", prop: "price", minWidth: 140 },




		{ label: "是否推荐", prop: "recommend", minWidth: 100, component: { name: "cl-switch" } },
		{ label: "是否在线", prop: "online", minWidth: 100, component: { name: "cl-switch" } },
		{ 	label: "服务方式",
			prop: "serviceMode",
			minWidth: 200,
			dict:dict.get("serviceMode")
		},

		{ label: "昵称", prop: "nickName", minWidth: 140 },
		{ label: "工作性质", prop: "workNature", minWidth: 140 ,dict:  dict.get('workNature')},
		{ label: "职业", prop: "career", minWidth: 140,dict:  dict.get('career') },


		{
			label: "工作开始时间",
			prop: "workBegin",
			minWidth: 140,
			sortable: "custom",

			component: { name: "cl-date-text" ,props:{format:"HH:mm:ss"}}
		},
		{
			label: "工作结束时间",
			prop: "workEnd",
			minWidth: 140,
			sortable: "custom",
			component: { name: "cl-date-text",props:{format:"HH:mm:ss"} }
		},

		{ label: "所属国家", prop: "country", minWidth: 140,dict:  dict.get('country') },

		{ label: "籍贯",  prop: "nativePlace", minWidth: 140,dict: dict.get('province')},



		{ label: "年龄", prop: "age", minWidth: 140 },
		{ label: "介绍", prop: "intro", showOverflowTooltip: true, minWidth: 200 },
		{ label: "温馨提示",showOverflowTooltip:true,  prop: "tips", minWidth: 200 },
		{ label: "身高(CM)", prop: "height", minWidth: 140 },
		{ label: "体重(KG)", prop: "weight", minWidth: 140 },
		{ label: "胸围", prop: "bust", minWidth: 140 },
		{ label: "关联帐号", prop: "refUserId", minWidth: 140 },

		{ label: "创建帐号", prop: "userId", minWidth: 140 },

		{ type: "op",width:260, buttons: ["slot-sellbtn","edit", "delete"] }
	]
});

const AdvSearch = useAdvSearch({
	items: [
		{
			label: "区域",
			prop: "province",
			component: {
				name: "cl-select",
				props: {
					tree: true,
					checkStrictly: true,
					options: dict.get('province')
				}
			}
		},
		{
			label: "工作地点",
			prop: "address",
			component: {
				name: "el-input",
				props: {
					clearable: true
				}
			}
		},
		{
			label: "昵称",
			prop: "nickname",
			component: {
				name: "el-input",
				props: {
					clearable: true
				}
			}
		},
		{
			label: "等级",
			prop: "leveSortation",
			component: {
				name: "cl-select",
				props: {
					options: dict.get('leveSortation')
				}
			}
		},
		{
			label: "服务方式",
			prop: "serviceMode",
			component: {
				name: "cl-select",
				props: {
					options: dict.get('serviceMode')
				}
			}
		},
		{
			label: "是否在线",
			prop: "online",
			component: {
				name: "cl-select",
				props: {
					options: options.yesNo
				}
			}
		},
		{
			label: "是否推荐",
			prop: "recommend",
			component: {
				name: "cl-select",
				props: {
					options: options.yesNo
				}
			}
		},


	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.phoenix.girl

	},
	(app) => {
		app.refresh();
	}
);

// cl-search 配置
//【很重要】该组件基于 cl-form 故很多示例都可复用
const Search = useSearch({
	// 配置如 cl-form 一样
	items: [
		{
			label: "区域",
			prop: "province",
			component: {
				name: "cl-select",
				props: {
					tree: true,
					checkStrictly: true,
					options: dict.get('province')
				}
			}
		},
		{
			label: "工作地点",
			prop: "address",
			component: {
				name: "el-input",
				props: {
					clearable: true
				}
			}
		},
		{
			label: "昵称",
			prop: "nickname",
			component: {
				name: "el-input",
				props: {
					clearable: true
				}
			}
		},

	]
});

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
// 服务价格
function openSell(item:any) {

	refs.sell.open(item);
}
</script>
