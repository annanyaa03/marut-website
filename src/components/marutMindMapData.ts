import { type Node, type Edge } from '@xyflow/react';

export type NodeCategory =
  | 'root'
  | 'branch'
  | 'section'
  | 'leaf'
  | 'task';

export type MarutNodeData = {
  label: string;
  category: NodeCategory;
  collapsed?: boolean;
  childIds?: string[];
  side?: 'left' | 'right';
  [key: string]: unknown;
};

export const initialNodes: Node<MarutNodeData>[] = [
  // ── Root ──────────────────────────────────────────────
  {
    id: 'root',
    type: 'marutNode',
    position: { x: 0, y: 460 },
    data: { label: 'Marut FCU', category: 'root', collapsed: false, childIds: ['sw', 'hw'] },
  },

  // ── Branch: Software Architecture ─────────────────────
  {
    id: 'sw',
    type: 'marutNode',
    position: { x: 260, y: 460 },
    data: { label: 'Software Architecture', category: 'branch', collapsed: false, childIds: ['exec'], side: 'right' },
  },
  {
    id: 'exec',
    type: 'marutNode',
    position: { x: 540, y: 460 },
    data: { label: 'Execution Layer', category: 'section', collapsed: false, childIds: ['freertos', 'main', 'sensor_init', 'calib', 'kernel'], side: 'right' },
  },
  { id: 'freertos', type: 'marutNode', position: { x: 820, y: 170 }, data: { label: 'FreeRTOS CMSIS V2', category: 'leaf', side: 'right' } },
  { id: 'main', type: 'marutNode', position: { x: 820, y: 250 }, data: { label: 'Enters (main)', category: 'leaf', side: 'right' } },
  { id: 'sensor_init', type: 'marutNode', position: { x: 820, y: 330 }, data: { label: 'Sensor Init', category: 'leaf', side: 'right' } },
  { id: 'calib', type: 'marutNode', position: { x: 820, y: 410 }, data: { label: 'Calibration Starts', category: 'leaf', side: 'right' } },
  {
    id: 'kernel',
    type: 'marutNode',
    position: { x: 820, y: 550 },
    data: { label: 'Kernel Init and RTOS Start', category: 'section', collapsed: false, childIds: ['mode_task', 'arm_task', 'debounce', 'telem_task'], side: 'right' },
  },
  {
    id: 'mode_task',
    type: 'marutNode',
    position: { x: 1120, y: 510 },
    data: { label: 'Mode Task', category: 'task', collapsed: false, childIds: ['fw_task', 'quad_task', 'vtol_task'], side: 'right' },
  },
  { id: 'arm_task', type: 'marutNode', position: { x: 1120, y: 590 }, data: { label: 'Arm/Disarm task', category: 'task', side: 'right' } },
  { id: 'debounce', type: 'marutNode', position: { x: 1120, y: 670 }, data: { label: 'Debounce task', category: 'task', side: 'right' } },
  { id: 'telem_task', type: 'marutNode', position: { x: 1120, y: 750 }, data: { label: 'Telemetry task', category: 'task', side: 'right' } },
  { id: 'fw_task', type: 'marutNode', position: { x: 1380, y: 430 }, data: { label: 'Fixed wing task', category: 'leaf', side: 'right' } },
  { id: 'quad_task', type: 'marutNode', position: { x: 1380, y: 510 }, data: { label: 'Quad task', category: 'leaf', side: 'right' } },
  { id: 'vtol_task', type: 'marutNode', position: { x: 1380, y: 590 }, data: { label: 'VTOL task', category: 'leaf', side: 'right' } },

  // ── Branch: Hardware Architecture ─────────────────────
  {
    id: 'hw',
    type: 'marutNode',
    position: { x: -260, y: 460 },
    data: { label: 'Hardware Architecture', category: 'branch', collapsed: false, childIds: ['mcu'], side: 'left' },
  },
  {
    id: 'mcu',
    type: 'marutNode',
    position: { x: -540, y: 460 },
    data: { label: 'STM32F411CEU Microcontroller', category: 'section', collapsed: false, childIds: ['sensor_blk', 'actuation', 'rc_input', 'telemetry'], side: 'left' },
  },

  // Sensor Block
  {
    id: 'sensor_blk',
    type: 'marutNode',
    position: { x: -820, y: 130 },
    data: { label: 'Sensor Block', category: 'section', collapsed: false, childIds: ['i2c', 'mpu6050', 'bmp280'], side: 'left' },
  },
  { id: 'i2c', type: 'marutNode', position: { x: -1120, y: 50 }, data: { label: 'I2C1 (400kHz)', category: 'leaf', side: 'left' } },
  { id: 'mpu6050', type: 'marutNode', position: { x: -1120, y: 130 }, data: { label: 'MPU6050 (IMU)', category: 'leaf', side: 'left' } },
  { id: 'bmp280', type: 'marutNode', position: { x: -1120, y: 210 }, data: { label: 'BMP280 (Barometer)', category: 'leaf', side: 'left' } },

  // Actuation & Locomotion
  {
    id: 'actuation',
    type: 'marutNode',
    position: { x: -820, y: 370 },
    data: { label: 'Actuation & Locomotion', category: 'section', collapsed: false, childIds: ['tim23', 'esc', 'motors'], side: 'left' },
  },
  { id: 'tim23', type: 'marutNode', position: { x: -1120, y: 290 }, data: { label: 'TIM2, TIM3 (50 Hz PWM)', category: 'leaf', side: 'left' } },
  { id: 'esc', type: 'marutNode', position: { x: -1120, y: 370 }, data: { label: 'ESC/Direct servos', category: 'leaf', side: 'left' } },
  { id: 'motors', type: 'marutNode', position: { x: -1120, y: 450 }, data: { label: 'Motors', category: 'leaf', side: 'left' } },

  // RC Input Block
  {
    id: 'rc_input',
    type: 'marutNode',
    position: { x: -820, y: 590 },
    data: { label: 'RC Input Block', category: 'section', collapsed: false, childIds: ['tim4', 'ppm'], side: 'left' },
  },
  { id: 'tim4', type: 'marutNode', position: { x: -1120, y: 530 }, data: { label: 'TIM4 (General purpose timer)', category: 'leaf', side: 'left' } },
  { id: 'ppm', type: 'marutNode', position: { x: -1120, y: 610 }, data: { label: 'PPM based receiver', category: 'leaf', side: 'left' } },

  // Telemetry & Positioning
  {
    id: 'telemetry',
    type: 'marutNode',
    position: { x: -820, y: 790 },
    data: { label: 'Telemetry & Positioning', category: 'section', collapsed: false, childIds: ['uart1', 'uart2', 'baud'], side: 'left' },
  },
  { id: 'uart1', type: 'marutNode', position: { x: -1120, y: 710 }, data: { label: 'UART1 (GPS NMEA/UBX)', category: 'leaf', side: 'left' } },
  { id: 'uart2', type: 'marutNode', position: { x: -1120, y: 790 }, data: { label: 'UART2 (FTDI Mav serial out)', category: 'leaf', side: 'left' } },
  { id: 'baud', type: 'marutNode', position: { x: -1120, y: 870 }, data: { label: 'Variable BAUD rates', category: 'leaf', side: 'left' } },
];

export const initialEdges: Edge[] = [
  // Root → branches
  { id: 'e-root-sw', source: 'root', sourceHandle: 'right', target: 'sw', type: 'smoothstep', animated: false },
  { id: 'e-root-hw', source: 'root', sourceHandle: 'left', target: 'hw', type: 'smoothstep', animated: false },

  // SW branch
  { id: 'e-sw-exec', source: 'sw', target: 'exec', type: 'smoothstep' },
  { id: 'e-exec-freertos', source: 'exec', target: 'freertos', type: 'smoothstep' },
  { id: 'e-exec-main', source: 'exec', target: 'main', type: 'smoothstep' },
  { id: 'e-exec-sinit', source: 'exec', target: 'sensor_init', type: 'smoothstep' },
  { id: 'e-exec-calib', source: 'exec', target: 'calib', type: 'smoothstep' },
  { id: 'e-exec-kernel', source: 'exec', target: 'kernel', type: 'smoothstep' },
  { id: 'e-kernel-mode', source: 'kernel', target: 'mode_task', type: 'smoothstep' },
  { id: 'e-kernel-arm', source: 'kernel', target: 'arm_task', type: 'smoothstep' },
  { id: 'e-kernel-deb', source: 'kernel', target: 'debounce', type: 'smoothstep' },
  { id: 'e-kernel-telem', source: 'kernel', target: 'telem_task', type: 'smoothstep' },
  { id: 'e-mode-fw', source: 'mode_task', target: 'fw_task', type: 'smoothstep' },
  { id: 'e-mode-quad', source: 'mode_task', target: 'quad_task', type: 'smoothstep' },
  { id: 'e-mode-vtol', source: 'mode_task', target: 'vtol_task', type: 'smoothstep' },

  // HW branch
  { id: 'e-hw-mcu', source: 'hw', target: 'mcu', type: 'smoothstep' },
  { id: 'e-mcu-sensor', source: 'mcu', target: 'sensor_blk', type: 'smoothstep' },
  { id: 'e-mcu-actuation', source: 'mcu', target: 'actuation', type: 'smoothstep' },
  { id: 'e-mcu-rc', source: 'mcu', target: 'rc_input', type: 'smoothstep' },
  { id: 'e-mcu-telemetry', source: 'mcu', target: 'telemetry', type: 'smoothstep' },
  { id: 'e-sensor-i2c', source: 'sensor_blk', target: 'i2c', type: 'smoothstep' },
  { id: 'e-sensor-mpu', source: 'sensor_blk', target: 'mpu6050', type: 'smoothstep' },
  { id: 'e-sensor-bmp', source: 'sensor_blk', target: 'bmp280', type: 'smoothstep' },
  { id: 'e-act-tim23', source: 'actuation', target: 'tim23', type: 'smoothstep' },
  { id: 'e-act-esc', source: 'actuation', target: 'esc', type: 'smoothstep' },
  { id: 'e-act-motors', source: 'actuation', target: 'motors', type: 'smoothstep' },
  { id: 'e-rc-tim4', source: 'rc_input', target: 'tim4', type: 'smoothstep' },
  { id: 'e-rc-ppm', source: 'rc_input', target: 'ppm', type: 'smoothstep' },
  { id: 'e-telem-uart1', source: 'telemetry', target: 'uart1', type: 'smoothstep' },
  { id: 'e-telem-uart2', source: 'telemetry', target: 'uart2', type: 'smoothstep' },
  { id: 'e-telem-baud', source: 'telemetry', target: 'baud', type: 'smoothstep' },
];
