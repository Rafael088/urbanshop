# Guía para Testers

## Tu Área de Trabajo

Trabajas en:
- `tests/unit/` → tests unitarios de funciones
- `tests/components/` → tests de componentes
- `tests/e2e/` → tests de flujo completo

## NO toques:
- Código de producción (solo tests)
- Si encuentras un bug, reportarlo, no arreglarlo

## Convenciones

### Estructura de Tests
- Un archivo de test por archivo de código
- Nombre: `nombre.test.ts` o `nombre.spec.ts`
- Usar `describe` para agrupar, `it` para casos individuales

### Qué Testear

**Unitarios:**
- Funciones de `src/lib/cart.ts`
- Funciones de validación
- Cálculos de precio, total, etc.

**Componentes:**
- Renderizado correcto
- Clicks en botones
- Formularios (validación, envío)

**E2E:**
- Flujo completo: navegar → agregar al carrito → checkout → pago
- Casos de error: stock insuficiente, formulario inválido

## Herramientas

- **Jest**: tests unitarios
- **Testing Library**: tests de componentes
- **Playwright**: tests E2E

## Ejemplo de Tarea

**Test de función agregarItem**

```typescript
import { agregarItem, obtenerCarrito } from '@/lib/cart';

describe('agregarItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe agregar un item nuevo al carrito', () => {
    const item = {
      productoId: 1,
      varianteId: 1,
      cantidad: 1,
      precio: 50000,
      nombre: 'Camiseta',
      imagen: '/img.jpg',
    };

    agregarItem(item);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(1);
    expect(carrito[0]).toEqual(item);
  });

  it('debe aumentar cantidad si el item ya existe', () => {
    const item = {
      productoId: 1,
      varianteId: 1,
      cantidad: 1,
      precio: 50000,
      nombre: 'Camiseta',
      imagen: '/img.jpg',
    };

    agregarItem(item);
    agregarItem(item);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(2);
  });
});
```

## Recursos
- Jest: https://jestjs.io/docs/getting-started
- Testing Library: https://testing-library.com/docs/
- Playwright: https://playwright.dev/docs/intro
