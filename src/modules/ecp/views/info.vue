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

				<template #slot-participant="{ scope }">
					<el-button size="small"  type="danger" @click="openParticipant(scope.row)">参与者</el-button>
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
	<participant :ref="setRefs('participant')" />
</template>

<script lang="ts" name="ecp-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useDict } from "/$/dict";


import participant from "../components/participant.vue";

const { service ,refs, setRefs} = useCool();

const { dict } = useDict();
// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: "封面图", required: true,prop: "coverUrl", component: { name: "cl-upload" } },
		{
			label: "标题",
			prop: "title",
			required: true,
			span: 12,
			component: { name: "el-input", props: { clearable: true } }
		},
		{
			label: "活动状态",
			prop: "state",
			span: 12,
			required: true,
			component: { name: "el-select",options:dict.get('ecpState'), props: { clearable: true } }
		},
		{
			label: "活动类型",
			prop: "ecpType",
			span: 12,
			required: true,
			component: { name: "el-select",options:dict.get('ecpType'), props: { clearable: true } }
		},
		{
			label: "算法",
			prop: "numerology",
			span: 12,
			required: true,
			component: { name: "el-select",options:dict.get('ecpNumerology'), props: { clearable: true } }
		},
		{
			label: "活动时间",
			prop: "datetimeRange",
			required: true,
			component: {
				name: "el-date-picker",
				props: { type: "datetimerange",format:"YYYY-MM-DD HH:mm:ss", valueFormat:"YYYY-MM-DD HH:mm:ss", rangeSeparator:"至",startPlaceholder : "开始时间", endPlaceholder:"结束时间"}
			}
		},

		{
			label: "活动总人数",
			prop: "peoples",
			hook: "number",
			required: true,
			span: 12,
			component: { name: "el-input-number" }
		},
		{
			label: "总费用",
			prop: "fee",
			span: 12,
			component: { name: "el-input", props: { clearable: true } }
		},

		{ label: "兑奖有效期", span: 12, prop: "valiDay", component: {  name: "el-input", props: { clearable: true,placeholder:"有效兑奖天数,默认7天",} }},
		{ label: "充许重复参与", span: 12, prop: "repeat", flex: false, component: { name: "cl-switch" } },


		{ label: "活动备注", prop: "remark",  component: { name: "el-input", props: { type: "textarea", rows: 4 } } },
		{ label: "关联用户ID", span: 12, prop: "refUserId",component: { name: "el-input", props: { clearable: true } },  },








	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: "封面图",
			prop: "coverUrl",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 40 }}
		},
		{ label: "活动类型", prop: "ecpType", minWidth: 140 ,dict: dict.get("ecpType")},
		{ label: "状态", prop: "state", minWidth: 140 ,dict: dict.get("ecpState")},
		{ label: "重复参与", prop: "repeat", minWidth: 100, component: { name: "cl-switch" }},
		{ label: "标题", prop: "title", minWidth: 140 },
		{ label: "目标总人数", prop: "peoples", minWidth: 140 },
		{ label: "算法", prop: "numerology", minWidth: 140,dict: dict.get("ecpNumerology") },
		{ label: "总费用", prop: "fee", minWidth: 140 },
		{ label: "累计收取费用", prop: "revFee", minWidth: 140 },

		{
			label: "开始时间",
			prop: "beginDate",
			minWidth: 200,
			sortable: "custom",
			component: { name: "cl-date-text" }
		},
		{
			label: "结束时间",
			prop: "endDate",
			minWidth: 200,
			sortable: "custom",
			component: { name: "cl-date-text" }
		},


		{ type: "op",width:260, buttons: ["slot-participant","edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.ecp.info
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}

// 打开参与者
function openParticipant(item:any) {
	refs.participant.open(item);
}
</script>
