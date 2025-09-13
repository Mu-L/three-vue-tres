// // 请求公共类型
// type RequestPublicConfigType = {
//   // 时间单位（时分秒）
//   requestIntervalUnit: RequestHttpIntervalEnum
//   // 请求内容
//   requestParams: RequestParams
// }


// // 单个图表请求配置
// export interface RequestConfigType extends RequestPublicConfigType {
//   // 所选全局数据池的对应 id
//   requestDataPondId?: string
//   // 组件定制轮询时间
//   requestInterval?: number
//   // 获取数据的方式
//   requestDataType: RequestDataTypeEnum
//   // 请求方式 get/post/del/put/patch
//   requestHttpType: RequestHttpEnum
//   // 源后续的 url
//   requestUrl?: string
//   // 请求内容主体方式 普通/sql
//   requestContentType: RequestContentTypeEnum
//   // 请求体类型
//   requestParamsBodyType: RequestBodyEnum
//   // SQL 请求对象
//   requestSQLContent: {
//     sql: string
//   }
// }
