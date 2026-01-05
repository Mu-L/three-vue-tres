/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 17:17:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-05 09:44:56
 */
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@pangenerator/tweakpane-textarea-plugin';
import JSON5 from 'json5'

export interface ConfigSchemaItem {
  name: string;
  com: 'Select' | 'ColorPicker' | 'Switch' | 'Slider' | 'jsonText';
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

  pane.registerPlugin(EssentialsPlugin);

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
          .on('change', (ev: any) => {
            values[key] = ev.value;
          });
        break;

      case 'ColorPicker':
        pane
          .addBinding(values, key, {
            label: item.name,
            picker: 'inline'
          })
          .on('change', (ev: any) => {
            values[key] = ev.value;
          });
        break;

      case 'Switch':
        pane
          .addBinding(values, key, {
            label: item.name,
          })
          .on('change', (ev: any) => {
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
          .on('change', (ev: any) => {
            values[key] = ev.value;
          });
        break;

      case 'jsonText':
        pane.addBinding(values, key, {
          view: 'textarea',
          label: 'JSON 数据',
          rows: 8,
          placeholder: '请在此输入 JSON...',
        })
        values.jsonError = ''; // 用于显示错误信息
        values.jsonTextChangeNumber = 0; // 用于触发更新
        const errorMessageBinding = pane.addBinding(values, 'jsonError', {
          label: 'JSON错误',
          readonly: true,
        });
        // 点击事件：校验并应用 JSON
        pane.addButton({ title: '应用JSON数据' }).on('click', () => {
          try {
            const parsed = JSON5.parse(values[key]);
            values.jsonError = 'JSON 校验成功'
            errorMessageBinding.refresh();
            console.log('JSON 校验成功：', parsed);
            values.jsonTextChangeNumber++;
          } catch (e: any) {
            values.jsonError = e.message;
            errorMessageBinding.refresh();
            console.warn('JSON 格式错误', e);
          }
        });
        break;

      default:
        console.warn(`未知组件类型：${item.com}`);
    }
  });

  return pane;
}
