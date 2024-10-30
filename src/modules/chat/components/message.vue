<template>
	<div v-loading="message?.loading" class="chat-message" element-loading-text="消息列表加载中">
		<!-- 头部 -->
		<div class="head">
			<template v-if="session?.value">
				<div class="avatar">
					<cl-avatar :size="30" shape="square" :src="session?.value.avatarUrl" />
				</div>
				<span class="name">与“{{ session?.value.nickName }}”聊天中</span>
			</template>
		</div>

		<!-- 消息列表 -->
		<el-scrollbar class="list" @scroll="scroll" ref="scrollContainerRef">
			<ul ref="scrollContentRef">
				<li v-for="(item, index) in list" :key="index">
					<div class="date" v-if="item.msgType == 3">{{item.msgContent}}</div>
					<div v-else class="item" :class="{'is-right': item.userType=='self'}">
						<div class="avatar">
							<cl-avatar :size="36" shape="square" :src="item.avatarUrl" />
						</div>
						<div
							class="det"
							@contextmenu="
								e => {
									onContextMenu(e, item);
								}
							"
						>
							<div class="h">
								<span class="name">{{ item.nickName }}</span>
							</div>
							<div class="content">
								<!-- 文本 -->
<<<<<<< HEAD
								<div class="is-text" v-if="item.msgType == 0">
									<span>{{ item.msgContent }}</span>
								</div>

								<!-- 图片 -->
								<div class="is-image" v-else-if="item.msgType == 1">
=======
								<div v-if="item.contentType == 0" class="is-text">
									<span>{{ item.content.text }}</span>
								</div>

								<!-- 图片 -->
								<div v-else-if="item.contentType == 1" class="is-image">
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
									<el-image
										:src="item.msgContent"
										:preview-src-list="previewUrls"
										:initial-index="item._index"
										scroll-container=".chat-message .list"
									/>
								</div>

								<!-- 预约消息 -->
								<div class="is-image" v-else-if="item.msgType == 902">
									<el-image
										:src="item.msgContent.image"
										:preview-src-list="previewUrls"
										:initial-index="item._index"
										scroll-container=".chat-message .list"
									/>
									<div class="is-text">
										<li>
											<el-link/>
											<span>[系统]->询问预约时间</span>
										</li>


									</div>

								</div>


							</div>
						</div>
					</div>
				</li>
			</ul>
		</el-scrollbar>

		<!-- 底部 -->
		<div class="footer">
			<div class="tools">
				<ul>
					<cl-upload :show-file-list="false" @success="onImageSend">
						<li>
							<el-icon><picture-filled /></el-icon>
						</li>
					</cl-upload>

					<li>
						<el-icon><video-camera /></el-icon>
					</li>

					<li>
						<el-icon><microphone /></el-icon>
					</li>

					<li>
						<el-icon><location /></el-icon>
					</li>
				</ul>
			</div>

			<div class="input">
				<el-input
					v-model="value"
					type="textarea"
					:rows="4"
					resize="none"
					:autosize="{
						minRows: 4,
						maxRows: 10
					}"
					placeholder="输入内容"
				></el-input>
				<el-button type="success" :disabled="!value" @click="onTextSend">发送</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
<<<<<<< HEAD
import { computed, ref,onMounted, nextTick } from "vue";
import { useChat } from "../hooks";
import { useStore } from "../store";
import { PictureFilled, VideoCamera, Microphone, Location } from "@element-plus/icons-vue";
import { useBase } from "/$/base";
import { ContextMenu } from "@cool-vue/crud";
import { useClipboard } from "@vueuse/core";
import { Chat } from "../types";
import { ElMessage } from "element-plus";
import { useCool } from "/@/cool";

=======
import { computed, ref } from 'vue';
import { useChat } from '../hooks';
import { useStore } from '../store';
import { PictureFilled, VideoCamera, Microphone, Location } from '@element-plus/icons-vue';
import { useBase } from '/$/base';
import { ContextMenu } from '@cool-vue/crud';
import { useClipboard } from '@vueuse/core';
import { Chat } from '../types';
import { ElMessage } from 'element-plus';
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc

const { user } = useBase();
const { chat } = useChat();
const { message, session } = useStore();
const { mitt } = useCool();

const { copy } = useClipboard();

const value = ref('');

const scrollContainerRef: any = ref(null);
const scrollContentRef:any = ref(null);



// 监听刷新事件
onMounted(() => {



	mitt.on("chat-message",msg=>{


		// 当前选中的会话消息
		let selToUserId=session?.value.toUserId;
		// 消息发送者
		let fromUserId=msg.fromUserId;
		let msgType=msg.msgType;
		let message=msg.message;

		console.log("在message收到消息:"+msg)


		//--判断选中的用户是否与消息发送者相同
		if(selToUserId==fromUserId){

			let contentType=0;
			//--文字--
			if(msgType==0){
				contentType=0;
			}
			//--图片--
			if(msgType==1){
				contentType=1;
			}
			//--显示消息到聊天窗口--
			chat.append({
				contentType: contentType,
				content: {
					text: message
				},
				userType:"friend",
				toUserId: session.value?.toUserId,
				avatarUrl: session.value?.toAvatarUrl,
				nickName: session.value?.toNickName,
			});

		}
		scrollToBottom();

	});

});



const scroll = ({ scrollTop}) => {
  //划到顶部加载数据
  if(scrollTop==0){
	let page=message.pagination.page+1;
	message.get({page:page,uid: session?.value.toUserId})
  }
}
// 过滤列表
const list = computed(() => {
	let n = 0;

<<<<<<< HEAD
	return message.list.map((e) => {
		//图片
		if (e.msgType == 1) {
=======
	return message.list.map(e => {
		if (e.contentType == 1) {
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
			e._index = n++;
		}

		return e;
	});

});

// 预览图片地址
const previewUrls = computed(() =>
	message.list
<<<<<<< HEAD
		.filter((e) => e.msgType == 1)
		.map((e) => e.msgContent)
=======
		.filter(e => e.contentType == 1)
		.map(e => e.content?.imageUrl)
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
		.filter(Boolean)
);


function scrollToBottom(){
	nextTick(() => {
		if (scrollContainerRef.value != null && scrollContentRef.value!=null) {
			scrollContainerRef.value!.setScrollTop(scrollContentRef.value!.clientHeight)
    	}
    })

}
// 文本消息
function onTextSend() {


	chat.send(
		{
			contentType: 0,
			content: {
				text: value.value
			},
			userType:"self",
			toUserId: session.value?.toUserId,
			avatarUrl: session.value?.fromAvatarUrl,
			nickName: session.value?.fromNickName,
		},
		true
	);
<<<<<<< HEAD
	value.value = "";

	scrollToBottom();
=======
	value.value = '';
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
}

// 图片消息
function onImageSend(res: any) {
	chat.send(
		{
			contentType: 1,
			content: {
				imageUrl: res.url
			},
			userType:"friend"
		},
		true
	);
<<<<<<< HEAD
	value.value = "";
	scrollToBottom();
=======
	value.value = '';
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
}

// 右键菜单
function onContextMenu(e: Event, item: Chat.Message) {
	ContextMenu.open(e, {
		hover: {
			target: 'content'
		},
		list: [
			{
				label: '复制',
				callback(done) {
					copy(item.content.text || '');
					ElMessage.success('复制成功');
					done();
				}
			},
			{
				label: '转发'
			},
			{
				label: '删除'
			}
		]
	});
}
</script>

<style lang="scss" scoped>
.chat-message {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 6px;
	height: 100%;
	box-sizing: border-box;

	.head {
		display: flex;
		align-items: center;
		height: 50px;
		padding: 0 10px;

		.name {
			margin-left: 10px;
			font-size: 14px;
		}

		ul {
			li {
				list-style: none;
			}
		}
	}

	.list {
		flex: 1;
		background-color: #f7f7f7;
		ul {
			& > li {
				list-style: none;

				.date {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 40px;
					font-size: 12px;
				}

				.item {
					display: flex;
					padding: 10px;

					.avatar {
						margin-right: 10px;
					}

					.det {
						.h {
							display: flex;
							align-items: center;
							.name {
								font-size: 12px;
								color: #666;
							}
						}

						.content {
							display: flex;
							flex-direction: column;
							margin-top: 5px;

							.is-text {
								background-color: #fff;
								padding: 8px;
								border-radius: 0 6px 6px 6px;
								max-width: 400px;
								font-size: 14px;
							}

							.is-image {
								background-color: #fff;

								.el-image {
									display: block;
									min-height: 100px;
									max-width: 200px;
									border-radius: 4px;
								}
							}
						}
					}

					&.is-right {
						flex-direction: row-reverse;

						.avatar {
							margin-left: 10px;
							margin-right: 0;
						}

						.det {
							.h {
								justify-content: flex-end;
							}

							.content {
								.is-text {
									border-radius: 6px 0 6px 6px;
								}
							}
						}
					}
				}
			}
		}
	}

	.footer {
		padding: 10px;

		.tools {
			display: flex;
			margin-bottom: 10px;

			ul {
				display: flex;
				align-items: center;
				flex: 1;

				li {
					height: 26px;
					width: 26px;
					border-radius: 4px;
					margin-right: 10px;
					list-style: none;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					font-size: 18px;

					&:hover {
						background-color: #f7f7f7;
					}
				}
			}
		}

		.input {
			display: flex;
			position: relative;

			.el-button {
				margin-left: 10px;
				position: absolute;
				right: 10px;
				bottom: 10px;
			}
		}
	}
}
</style>
