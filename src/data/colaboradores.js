export const colaboradores = [
  {
    id: '1',
    nombre: 'Jorge Ramírez',
    iniciales: 'JR',
    cargo: 'Operario de producción',
    planta: 'Planta Norte',
    turno: 'Turno A',
    turnoHorario: '06:00 – 14:00',
    antiguedad: '4 años 3 meses',
    sindicato: 'No sindicalizado',
    avatarColor: '#185FA5',
    nivelAlerta: 'atencion_urgente', // 'sin_senales' | 'observacion' | 'requiere_atencion' | 'atencion_urgente'

    senales: [
      {
        id: 'comportamiento_laboral',
        titulo: 'Comportamiento laboral',
        items: [
          { texto: 'Ausentismo recurrente: 3 episodios en 60 días', nivel: 'activa', fecha: 'Mar–Abr 2026' },
          { texto: 'Retrasos reiterados en línea de producción (8 en el mes)', nivel: 'activa', fecha: 'Abril 2026' },
          { texto: 'Incumplimiento de procedimiento de seguridad documentado', nivel: 'activa', fecha: '28 Mar 2026' },
        ],
      },
      {
        id: 'relacionamiento_interno',
        titulo: 'Relacionamiento interno',
        items: [
          { texto: 'Conflicto no resuelto con supervisor directo (Sr. I. Fuentes)', nivel: 'activa', fecha: 'Hace 12 días' },
          { texto: 'Quejas verbales de 2 compañeros de turno', nivel: 'observacion', fecha: 'Hace 30 días' },
        ],
      },
      {
        id: 'conductas_graves',
        titulo: 'Conductas graves',
        items: [
          { texto: 'Lenguaje intimidatorio en piso de planta (testigos presentes)', nivel: 'activa', fecha: '03 Abr 2026' },
        ],
      },
      {
        id: 'contexto_desempeno',
        titulo: 'Contexto y desempeño',
        items: [
          { texto: 'Caída de productividad: −22% vs. promedio del turno', nivel: 'activa', fecha: 'Mar–Abr 2026' },
          { texto: 'Evaluación de desempeño Q1 2026: 2.1/5 (bajo mínimo esperado)', nivel: 'activa', fecha: 'Abr 2026' },
          { texto: 'Capacitación Ley Karin pendiente de completar', nivel: 'observacion', fecha: 'Vence 30 Abr' },
        ],
      },
      {
        id: 'contexto_organizacional',
        titulo: 'Contexto organizacional',
        items: [
          { texto: 'Reestructuración de Turno A anunciada para Q3 2026', nivel: 'observacion', fecha: 'Mar 2026' },
          { texto: 'Clima laboral Planta Norte deteriorado (encuesta Feb. 2026)', nivel: 'observacion', fecha: 'Feb 2026' },
        ],
      },
      {
        id: 'eventos_legales',
        titulo: 'Eventos con consecuencias legales',
        items: [
          { texto: 'Denuncia anónima registrada en buzón de sugerencias', nivel: 'activa', fecha: '02 Abr 2026' },
          { texto: 'Accidente menor no reportado a tiempo (Ley 16.744)', nivel: 'activa', fecha: '18 Mar 2026' },
        ],
      },
    ],

    acciones: [
      {
        id: 1,
        titulo: 'Conversación de vinculación con RRHH',
        descripcion: 'Entrevista individual para identificar factores de tensión y necesidades del colaborador.',
        responsable: 'Carolina Muñoz',
        fecha: 'Iniciada 07 Abr 2026',
        estado: 'en_proceso',
      },
      {
        id: 2,
        titulo: 'Reunión de mediación con supervisor',
        descripcion: 'Sesión facilitada por RRHH entre Jorge Ramírez y el supervisor Sr. Ignacio Fuentes.',
        responsable: 'Pedro Soto',
        fecha: '12 Abr 2026',
        estado: 'agendada',
      },
      {
        id: 3,
        titulo: 'Derivación a programa de bienestar (EAP)',
        descripcion: 'Referir al colaborador al programa de apoyo psicológico externo.',
        responsable: 'Ana Torres',
        fecha: 'Por confirmar',
        estado: 'pendiente',
      },
      {
        id: 4,
        titulo: 'Revisión de carga de trabajo en línea de producción',
        descripcion: 'Evaluar distribución de tareas en Turno A junto al jefe de planta.',
        responsable: 'Luis Vera',
        fecha: '15 Abr 2026',
        estado: 'agendada',
      },
      {
        id: 5,
        titulo: 'Completar capacitación Ley Karin',
        descripcion: 'Inscribir y confirmar asistencia al módulo pendiente antes del vencimiento.',
        responsable: 'Jorge Ramírez',
        fecha: 'Antes del 30 Abr',
        estado: 'por_iniciar',
      },
    ],

    protocolo: {
      checklist: [
        { id: 'c1', texto: 'Contrato de trabajo original firmado', estado: 'al_dia' },
        { id: 'c2', texto: 'Últimas 3 liquidaciones de sueldo', estado: 'al_dia' },
        { id: 'c3', texto: 'Libro de asistencia (últimos 90 días)', estado: 'revisar' },
        { id: 'c4', texto: 'Amonestaciones escritas emitidas', estado: 'faltante' },
        { id: 'c5', texto: 'Evaluaciones de desempeño firmadas', estado: 'al_dia' },
        { id: 'c6', texto: 'Registro de capacitaciones obligatorias', estado: 'revisar' },
        { id: 'c7', texto: 'ODI vigente y firmado por el trabajador', estado: 'al_dia' },
        { id: 'c8', texto: 'Afiliación AFP / Isapre al día', estado: 'al_dia' },
        { id: 'c9', texto: 'Reglamento interno firmado y entregado', estado: 'al_dia' },
        { id: 'c10', texto: 'Registro de entrega y estado de EPP', estado: 'faltante' },
        { id: 'c11', texto: 'Cobertura seguro Ley 16.744 vigente', estado: 'al_dia' },
        { id: 'c12', texto: 'Denuncia interna registrada formalmente', estado: 'no_aplica' },
      ],
      exposicionDT: {
        nivel: 'Medio',
        items: [
          {
            concepto: 'Multa por infracción art. 506 Código del Trabajo',
            monto: '1–60 UTM',
            montoRef: '$65.630 – $3.937.800 aprox.',
          },
          {
            concepto: 'Sanción por incumplimiento Ley 16.744 (accidente no reportado)',
            monto: '10–150 UTM',
            montoRef: '$656.300 – $9.844.500 aprox.',
          },
          {
            concepto: 'Fiscalización por denuncia anónima (tutela ante Inspección)',
            monto: 'Sin monto',
            montoRef: 'Genera inspección in situ',
          },
        ],
      },
      exposicionTribunal: {
        nivel: 'Alto',
        items: [
          {
            concepto: 'Despido injustificado (art. 168 CdT)',
            monto: '~$3.380.000',
            detalle: '4 años × $650.000 + recargo 30%',
          },
          {
            concepto: 'Despido indirecto art. 171 CdT',
            monto: '~$4.680.000',
            detalle: '4 años × $650.000 + recargo 80%',
          },
          {
            concepto: 'Tutela laboral (art. 489 CdT)',
            monto: 'Hasta ~$7.150.000',
            detalle: 'Hasta 11 meses de remuneración',
          },
          {
            concepto: 'Cobro de prestaciones (feriados, horas extra)',
            monto: 'Variable',
            detalle: 'Depende de registros de asistencia',
          },
          {
            concepto: 'Nulidad del despido',
            monto: '~$650.000/mes',
            detalle: 'Remuneraciones devengadas mientras dure el juicio',
          },
        ],
      },
    },
  },
]
