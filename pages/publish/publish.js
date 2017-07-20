
Page({

	data: {
		success: false,
		address: "请选择你的当前位置"
	},

	staticData: {
		longitude: "",
    	latitude: "",
    	type: "",
    	message: "",
    	contact: ""
	},
	
	handleAddressTap: function() {
		wx.chooseLocation({
			success: this.handleAddressSuccess.bind(this)
		})
	},

	handleAddressSuccess: function(res) {
		this.setData({
			address: res.address
		})
		Object.assign(this.staticData, {
			longitude: res.longitude,
    	latitude: res.latitude
		})
	},

	handleTypeChange: function(e) {
		this.staticData.type = e.detail.value;
	},

	handleMessageInput: function(e) {
		this.staticData.message = e.detail.value;
	},

	handleContactInput: function(e) {
		this.staticData.contact = e.detail.value;
	},

	handlePostTap: function() {
		if(this.data.address == "" || this.data.address == "请选择你的当前位置"){
			wx.showModal({
			  title: '提示',
			  content: '请输入正确地址'
			})
		}else if(this.staticData.type == ""){
			wx.showModal({
			  title: '提示',
			  content: '请选择类型'
			})
		}else if(this.staticData.message == ""){
			wx.showModal({
			  title: '提示',
			  content: '请输入具体说明'
			})
		}else if(this.staticData.contact == ""){
			wx.showModal({
			  title: '提示',
			  content: '请输入联系方式'
			})
		};
		wx.request({
			url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item', 
			  data: {
			     address: this.data.address ,
			     longitude: this.staticData.longitude,
			     latitude:this.staticData.latitude,
			     type: this.staticData.type,
    			 message: this.staticData.message,
    			 contact: this.staticData.contact,
    			 distinct: "tianlei930618"
			  },
			  method: "POST",
			  header: {
			      'content-type': 'application/x-www-form-urlencoded'
			  },
			  success: this.handleAddItemSucc.bind(this)
			  
		});
		
	},
	handleAddItemSucc: function()  {
		this.setData({success: true})
	}

})
