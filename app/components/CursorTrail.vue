<template>
  <ClientOnly>
    <div v-if="enabled" class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        v-for="point in trail"
        :key="point.id"
        class="absolute will-change-transform"
        :style="{
          left: '0',
          top: '0',
          opacity: point.opacity,
          transform: `translate3d(${point.x}px, ${point.y}px, 0) scale(${point.scale}) rotate(${point.rotation}deg)`,
          fontSize: `${point.size}px`,
          color: point.color,
          textShadow: point.glow ? `0 0 10px ${point.color}` : 'none',
          filter: point.blur ? 'blur(1px)' : 'none'
        }"
      >
        {{ point.char }}
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const enabled = useState('cursorTrailEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => 0)

interface TrailPoint {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  scale: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  char: string
  glow: boolean
  blur: boolean
}

const trail = ref<TrailPoint[]>([])

let mouseX = 0
let mouseY = 0
let lastMouseX = 0
let lastMouseY = 0
let idCounter = 0
let animationFrame: number
let hue = 0

const getTrailChar = computed(() => {
  switch (brainrotLevel.value) {
    case 25: return '✨'
    case 50: return '🧀'
    case 75: return '🗿'
    case 100: return '🐈'
    default: return '●'
  }
})

const updateTrail = () => {
  if (enabled.value) {
    const dist = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY)
    
    if (dist > 2) {
      const moveVx = (mouseX - lastMouseX) * 0.1
      const moveVy = (mouseY - lastMouseY) * 0.1

      hue = (hue + 5) % 360
      const isNormal = brainrotLevel.value === 0
      const color = isNormal ? `hsl(${hue}, 100%, 75%)` : 'currentColor'
      
      trail.value.push({
        id: idCounter++,
        x: mouseX,
        y: mouseY,
        vx: moveVx * 0.2 + (Math.random() - 0.5) * 2,
        vy: moveVy * 0.2 + (Math.random() - 0.5) * 2,
        opacity: 1,
        scale: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: isNormal ? 12 : 48,
        color: color,
        char: getTrailChar.value,
        glow: isNormal,
        blur: isNormal
      })

      lastMouseX = mouseX
      lastMouseY = mouseY
    }
  }

  trail.value = trail.value
    .map(p => {
      p.x += p.vx
      p.y += p.vy
      
      p.vx *= 0.95
      p.vy *= 0.95
      
      p.rotation += p.rotationSpeed
      
      p.opacity -= 0.015
      p.scale *= 0.97

      return p
    })
    .filter(p => p.opacity > 0.05)

  animationFrame = requestAnimationFrame(updateTrail)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (lastMouseX === 0 && lastMouseY === 0) {
    lastMouseX = mouseX
    lastMouseY = mouseY
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animationFrame = requestAnimationFrame(updateTrail)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame)
})
</script>