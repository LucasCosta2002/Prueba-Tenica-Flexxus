-- En este archivo deben estar tus ejercicios de consultas sql

-- 1)
SELECT CONCAT(NOMBRES, ' ', APELLIDO) AS "Nombre Completo"
FROM EMPLEADOS 
ORDER BY NOMBRES DESC;

-- 2)
SELECT CONCAT(e.NOMBRES, ' ', e.APELLIDO) AS "Nombre Completo", p.PUESTO, l.LOCALIDAD
FROM EMPLEADOS e
JOIN PUESTOS p ON e.PUESTO_ID = p.ID AND p.PUESTO LIKE '%Soporte%'
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON e.LOCALIDAD_ID = l.ID;

-- 3)
SELECT *
FROM EMPLEADOS
WHERE NOMBRES LIKE '%o';

-- 4) 
SELECT CONCAT(e.NOMBRES, ' ', e.APELLIDO) AS "Nombre Completo", e.SUELDO, l.LOCALIDAD
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON e.LOCALIDAD_ID = l.ID
WHERE l.LOCALIDAD = 'Carlos Paz';

-- 5)
SELECT CONCAT(e.NOMBRES, ' ', e.APELLIDO) AS "Nombre Completo", e.SUELDO, l.LOCALIDAD
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON e.LOCALIDAD_ID = l.ID
WHERE e.SUELDO BETWEEN 10000 AND 13000;

-- 6) 
SELECT d.*
FROM DEPARTAMENTOS d
JOIN EMPLEADOS e ON e.DEPARTAMENTO_ID = d.ID
GROUP BY d.ID
HAVING COUNT(e.ID) > 5;

-- 7)
SELECT CONCAT(e.NOMBRES, ' ', e.APELLIDO) AS "Nombre Completo"
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON e.LOCALIDAD_ID = l.ID
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
WHERE l.LOCALIDAD = 'Córdoba'
AND (p.PUESTO = 'Analista' OR p.PUESTO = 'Programador');

-- 8)
SELECT AVG(SUELDO) AS "Sueldo Medio"
FROM EMPLEADOS;

-- 9)
SELECT MAX(e.SUELDO) AS "Máximo Sueldo"
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
WHERE d.ID = 10;

-- 10)
SELECT MIN(e.SUELDO) AS "Sueldo Mínimo"
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
WHERE p.PUESTO = 'Soporte';

-- 11)
SELECT p.PUESTO, SUM(e.SUELDO) AS "Total de Sueldos"
FROM EMPLEADOS e
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
GROUP BY p.PUESTO;