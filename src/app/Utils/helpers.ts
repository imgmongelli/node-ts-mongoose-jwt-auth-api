function handleMongoError (error: any) {
  // Gestione di errori di mongoose
  if ((error as { code: number }).code === 11000) {
    return { status: 409, message: 'Email already in use' }
  }
  // Gestione di errori generici
  return { status: 500, message: 'Something went wrong' }
}

export { handleMongoError }
