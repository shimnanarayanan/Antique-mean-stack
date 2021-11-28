const mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
  },
  // orderNo: {
  //   type: String,
  // },
  orderType: {
    type: String,
    enum: ["MownehOld", "Normal"],
    default: "Normal",
  },
  orderPrefix: {
    type: String,
    default: "--21",
  },
  orderNumber: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  productOptionValue: {
    type: Schema.Types.ObjectId,
    ref: "ProductOptionValue",
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  driverStatus: {
    type: Schema.Types.ObjectId,
    ref: "DriverStatus",
  },
  option: {
    type: Array,
  },
  optionArabic: {
    type: Array,
  },
  productName: {
    english: {
      type: String,
    },
    arabic: {
      type: String,
    },
  },
  itemCode: {
    type: String,
  },
  // mownehproductName: {
  //   type: Array
  // },
  productImage: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  // mownehOriginalPrice: {
  //   type: Array,
  // },
  price: {
    type: Number,
  },
  // mownehPrice: {
  //   type: Array,
  // },
  discountAmount: {
    type: Number,
  },
  discountType: {
    type: String,
  },
 
  platform: {
    type: String
  },
 
  orderDate: {
    type: Date,

  },
  paymentMethod: {
    type:String
  },
  paymentStatus: {
    type: String,
    enum: ["Started", "Failed", "Cancelled", "Success", "COD", "Refund"],
    default: "Started",
  },
  orderStatus: {
    type:String
  },
  billingAddress: {
    name: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    muncipalityPlateImage: {
      type: String
    },
    phone: {
      type: String,
    },
    zone: {
      type: String,
    },
    city: {
      english: {
        type: String,
      },
      arabic: {
        type: String,
      },
    },
    country: {
      english: {
        type: String,
      },
      arabic: {
        type: String,
      },
    },
    additionalDirection: {
      type: String,
    },
  },
  shippingAddress: {
    name: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    phone: {
      type: String,
    },
    muncipalityPlateImage: {
      type: String
    },
    zone: {
      type: String,
    },
    city: {
      english: {
        type: String,
      },
      arabic: {
        type: String,
      },
    },
    country: {
      english: {
        type: String,
      },
      arabic: {
        type: String,
      },
    },
    additionalDirection: {
      type: String,
    },
  },
  fromTime: {
    type: String
  },
  toTime: {
    type: String
  },
  deliveryDate: {
    type: Date,
  },
  deliveryType: {
    type: String,
  },
  driverNotes: {
    type: String
  },
  paymentCollected: {
    type: Boolean,
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  phpID: {
    type: Number,
    index: true,
  },
});

OrderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "orderNo",
  startAt: 100000,
  incrementBy: 1,
});


const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
