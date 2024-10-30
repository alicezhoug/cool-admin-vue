<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<!-- 新增按钮 -->
			<cl-add-btn />

			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<!-- 登录方式 -->
			<cl-filter label="登录方式">
				<cl-select   :options="dict.get('loginType')" prop="loginType" :width="120" />
			</cl-filter>
			<!-- 性别
			<cl-filter label="性别">
				<cl-select :options="dict.get('gender')" prop="gender" :width="120" />
			</cl-filter>
			-->
			<!--
			<cl-filter label="状态">
				<cl-select :options="dict.get('userStatus')" prop="status" :width="120" />
			</cl-filter>
			 -->
			<!-- 类型-->
			<cl-filter label="状态">
				<cl-select :options="options.onlines" prop="online" :width="120" />
			</cl-filter>
			<!-- 类型-->
			<cl-filter label="类型">
				<cl-select :options="dict.get('userSortation')" prop="sortation" :width="120" />
			</cl-filter>
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索昵称、手机号" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="user-list" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { reactive } from "vue";
import { useDict } from "/$/dict";

const { service } = useCool();

const options=reactive({
	onlines:[
		{
			label:"在线",
			value:true,
			type: "success"
		},
		{
			label:"离线",
			value:false,
			type:"danger"
		}
	]
});

const { dict } = useDict();



// cl-table
const Table = useTable({
	columns: [
		{
			type: "selection",
			width: 60
		},
		{
			label: "昵称",
			prop: "nickName",
			minWidth: 150
		},
		{
			label: "头像",
			prop: "avatarUrl",
			minWidth: 100,
			component: {
				name: "cl-avatar"
			}
		},
		{
			label: "用户类型",
			prop: "sortation",
			dict: dict.get("userSortation"),
			minWidth: 120
		},
		{
			label: "是否在线",
			prop: "online",
			dict: options.onlines,
			minWidth: 120
		},
		{
			label: "IP地址",
			prop: "ipAddr",
			minWidth: 120
		},
		{
			label: "省份(IP)",
			prop: "ipProvinceLabel",
			minWidth: 100
		},
		{
			label: "城市(IP)",
			prop: "ipCityLabel",
			minWidth: 100
		},
		{
			label: "国家(IP)",
			prop: "ipCountryLabel",
			minWidth: 100
		},
		{
			label: "手机",
			prop: "phone",
			minWidth: 120
		},
		{
			label: "登录帐号",
			prop: "username",
			minWidth: 120
		},

		{
			label: "性别",
			prop: "gender",
			dict: dict.get("gender"),
			minWidth: 100
		},
		{
			label: "登录方式",
			prop: "loginType",
			dict: dict.get("loginType"),
			minWidth: 100
		},
		{
			label: "职业",
			prop: "career",
			dict: dict.get("career"),
			minWidth: 100
		},
		{
			label: "状态",
			prop: "status",
			minWidth: 120,
			dict: dict.get('userStatus')
		},
		{
			label: "创建时间",
			prop: "createTime",
			sortable: "desc",
			minWidth: 170
		},
		{
			label: "UID",
			prop: "id",
			minWidth: 150
		},
		{
			label: "操作",
			type: "op",
			buttons: ["edit", "delete"]
		}
	]
});

// cl-upsert
const Upsert = useUpsert({
	dialog: {
		width: "600px"
	},
	items: [
		{
			prop: "avatarUrl",
			label: "头像",
			component: { name: "cl-upload" }
		},
		{
			prop: "nickName",
			label: "昵称",
			component: { name: "el-input" },
			span: 12,
			required: true
		},
		{
			label: "用户分类",
			prop: "sortation",
			span: 12,
			component: { name: "el-select",options:dict.get('userSortation'), props: { clearable: true } }
		},
		{
			prop: "phone",
			label: "手机号",
			span: 12,
			component: {
				name: "el-input",
				props: {
					maxlength: 11
				}
			}
		},
		{
			label: "出生日期",
			prop: "birthday",
			span: 12,
			component: {
				name: "el-date-picker"
			}
		},
		{
			prop: "username",
			label: "登录帐号",
			span: 12,
			component: {
				name: "el-input",
				props: {
					maxlength: 20
				}
			}
		},
		{
			label: "登录密码",
			prop: "password",
			span: 12,
			component: {
				name: "el-input",
				props: {
					maxlength: 20,
					type:"password"
				}
			}
		},
		{
			prop: "gender",
			label: "性别",
			span: 12,
			value: 1,
			component: {
				name: "el-select",
				options: dict.get('gender')
			}
		},
		{
			label: "职业",
			prop: "career",
			span: 12,
			component: { name: "el-select",options:dict.get('career'), props: { clearable: true } }
		},
		{
			prop: "status",
			label: "状态",
			value: 1,
			component: {
				name: "el-radio-group",
				options: dict.get('userStatus')
			}
		}
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.user.info
	},
	(app) => {
		app.refresh();
	}
);
</script>
