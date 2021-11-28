const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const OrderGroupSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  orderNumber: {
    type: Number
  },
  // orderNumber: {
  //   type: String
  // },
  orderGroupPrefix: {
    type: String,
    default: "-21",
  },
  orderGroupNumber: {
    type: String
  },
  subTotal: {
    type: Number,
  },
  grandTotal: {
    type: Number,
  },
  subTotalbackUp: {
    type: Number,
  },
  grandTotalbackUp: {
    type: Number,
  },
  shippingCharge: {
    type: Number,
    default: 0,
  },
  couponDiscount: {
    type: Number,
    default: 0,
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
  orderStatus: {
    type:String
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
  orderDate:{
    type:Date
  },
  invoiceNo: {
    type: Number,
  },
  // invoiceNo: {
  //   type: String,
  // },
  invoicePrefix: {
    type: String,
  },
  invoiceSuffix: {
    type: String,
    default: "-21",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  discount: {
    type: Number,
  },
  discountType: {
    type: String,
  },
  platform: {
    type: String
  },
  paymentMethod: {
   type:String
  },
  paymentStatus: {
    type: String,
    enum: ["Started", "Failed", "Cancelled", "Success", "COD"],
    default: "Started",
  },
  codType: {
    type: String,
    enum: ["Card", "Cash"],

  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  driverStatus: {
    type: Schema.Types.ObjectId,
    ref: "DriverStatus",
  },
  driverNotes: {
    type: String
  },
  paymentCollected: {
    type: Boolean,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  transaction_uuid: {
    type: String
  },
  reference_number: {
    type: String
  },
  message: {
    type: String
  },
  transactionRequestID: {
    type: String
  },
  reasonCode: {
    type: String
  },
  cardType: {
    type: String
  },
  cardExpDate: {
    type: String
  },
  cardNumber: {
    type: String
  },
  amount: {
    type: String
  },
  currency: {
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

OrderGroupSchema.plugin(autoIncrement.plugin, {
  model: "OrderGroup",
  field: "orderNumber",
  startAt: 100000,
  incrementBy: 1,
});
OrderGroupSchema.plugin(autoIncrement.plugin, {
  model: "OrderGroup",
  field: "invoiceNo",
  startAt: 100000,
  incrementBy: 1,
});

const OrderGroup = mongoose.model("OrderGroup", OrderGroupSchema);

module.exports = OrderGroup;
