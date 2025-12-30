/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 17:17:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-29 17:22:30
 */
import { Pane } from 'tweakpane';

export interface ConfigSchemaItem {
  name: string;
  com: 'Select' | 'ColorPicker' | 'Switch' | 'Slider';
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  step?: number;
}

export type ConfigSchema = Record<string, ConfigSchemaItem>;

/**
 * 传入 container 容器、配置 schema、默认数据
 * 自动生成 tweakpane UI，并返回 pane 实例
 */
export function createConfigPane(
  container: HTMLElement,
  config: ConfigSchema,
  values: Record<string, any>, // 外部状态对象：UI 改变会同步到它
) {
  const pane = new Pane({
    container,
    title: '配置',
  }) as any

  Object.entries(config).forEach(([key, item]) => {
    switch (item.com) {
      case 'Select':
        pane
          .addBinding(values, key, {
            label: item.name,
            options: item.options?.reduce((acc, cur) => {
              acc[cur.label] = cur.value;
              return acc;
            }, {} as Record<string, any>),
          })
          .on('change', ev => {
            values[key] = ev.value;
          });
        break;

      case 'ColorPicker':
        pane
          .addBinding(values, key, {
            label: item.name,
            picker: 'inline'
          })
          .on('change', ev => {
            values[key] = ev.value;
          });
        break;

      case 'Switch':
        pane
          .addBinding(values, key, {
            label: item.name,
          })
          .on('change', ev => {
            values[key] = ev.value;
          });
        break;

      case 'Slider':
        pane
          .addBinding(values, key, {
            label: item.name,
            min: item.min,
            max: item.max,
            step: item.step,
          })
          .on('change', ev => {
            values[key] = ev.value;
          });
        break;

      default:
        console.warn(`未知组件类型：${item.com}`);
    }
  });

  return pane;
}
